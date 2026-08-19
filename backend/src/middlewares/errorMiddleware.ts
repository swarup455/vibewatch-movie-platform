import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
    err: Error & {
        statusCode?: number;
        isOperational?: boolean;
    },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode ?? 500;
    console.error("ERROR:", {
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
    });
    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Internal server error"
                : err.message,
    });
}