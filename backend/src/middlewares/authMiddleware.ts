import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apiError.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) throw new ApiError(401, "No access token!");

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string };
        (req as any).userId = payload.userId;

        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
}