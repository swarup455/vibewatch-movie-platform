import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("accessToken");
    const { pathname } = req.nextUrl;

    if (pathname === "/") {
        return NextResponse.next();
    }

    if (pathname.startsWith("/auth")) {
        if (token) {
            return NextResponse.redirect(new URL("/discover", req.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Run middleware on all routes except Next.js internals
         * and static files.
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};