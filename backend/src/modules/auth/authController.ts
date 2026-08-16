import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import prisma from "../../lib/prisma.js";

export const googleRedirect = (req: Request, res: Response) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    });
    res.redirect(`${process.env.GOOGLE_AUTH_URL}?${params.toString()}`);
};

export const googleCallback = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;
    if (!code) {
        throw new ApiError(400, "Missing code!");
    }

    const { data: tokenData } = await axios.post(process.env.GOOGLE_TOKEN_URL ?? "", {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
    });

    const { data: profile } = await axios.get(process.env.GOOGLE_USERINFO_URL ?? "", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const user = await prisma.user.upsert({
        where: {
            provider_providerId: {
                provider: "google",
                providerId: profile.sub
            }
        },
        update: {
            name: profile.name
        },
        create: {
            email: profile.email,
            name: profile.name,
            provider: "google",
            providerId: profile.sub,
        }
    })

    // Issue my own tokens
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "30d",
    });

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
    });

    return res
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        })
        .send(`<script>window.opener.postMessage({type:"vibewatch-auth-success"},"${process.env.CLIENT_URL}");window.close();</script>`);
});

export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (!token) throw new ApiError(401, "No refresh token!");

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: String };

    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored || stored.expiresAt < new Date()) {
        throw new ApiError(401, "Invalid or expired refresh token!");
    }

    const accessToken = jwt.sign({ userId: payload.userId }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m",
    });

    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        })
});

export const logout = async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    if (token) await prisma.refreshToken.deleteMany({ where: { token } });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ success: true });
};

export const getMe = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({ where: { id: (req as any).userId } });
    res.json({ user });
};