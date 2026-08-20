import prisma from "../../lib/prisma.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Request, Response } from "express";

export const fetchMovies = asyncHandler(async (req: Request, res: Response) => {
    const movies = await prisma.movie.findMany();

    if (movies.length === 0) {
        return res.status(200).json(
            new ApiResponse(
                200,
                [],
                "No movies available!"
            )
        )
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            movies,
            "Movies fetched successfully!"
        )
    );
})

export const fetchMovieById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (Array.isArray(id) || !id) {
            throw new ApiError(400, "Invalid movie ID");
        }

        const movie = await prisma.movie.findUnique({
            where: {
                id,
            },
        });

        if (!movie) {
            throw new ApiError(404, "Movie not found");
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                movie,
                "Movie fetched successfully!"
            )
        );
    }
);