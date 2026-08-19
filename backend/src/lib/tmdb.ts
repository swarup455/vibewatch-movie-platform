import "dotenv/config"
import axios from "axios";
import { ApiError } from "../utils/apiError.js";

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const BASE_URL = "https://api.themoviedb.org/3";

interface TmdbVideo {
    key: string;
    site: string;
    type: string;
    official: boolean;
}

interface TmdbKeyword {
    id: number;
    name: string;
}

interface TmdbGenre {
    id: number;
    name: string;
}

// Fetch popular movies
export const fetchPopularMoviesPage = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                page,
            },
        });

        return {
            results: response.data.results as any[],
            totalPages: response.data.total_pages as number,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("TMDB error code:", error.code);
            console.error("TMDB error message:", error.message);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        } else {
            console.error("Non-axios error:", error);
        }
        throw new ApiError(502, "Failed to fetch movies");
    }
};

// Fetch full movie details
export const fetchMovieDetails = async (tmdbId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${tmdbId}`, {
            params: {
                api_key: TMDB_API_KEY,
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("TMDB error code:", error.code);
            console.error("TMDB error message:", error.message);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        } else {
            console.error("Non-axios error:", error);
        }
        throw new ApiError(502, "Failed to fetch details for movie");
    }
};

// Fetch trailer video key
export const fetchMovieVideos = async (
    tmdbId: number
): Promise<string | null> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/movie/${tmdbId}/videos`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                },
            }
        );

        const videos = response.data.results as TmdbVideo[];

        const officialTrailer = videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official
        );

        const anyTrailer = videos.find(
            (video) =>
                video.site === "YouTube" &&
                video.type === "Trailer"
        );

        return officialTrailer?.key ?? anyTrailer?.key ?? null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("TMDB error code:", error.code);
            console.error("TMDB error message:", error.message);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        } else {
            console.error("Non-axios error:", error);
        }
        throw new ApiError(502, "Failed to fetch videos for movie");
    }
};

// Fetch keyword tags
export const fetchMovieKeywords = async (
    tmdbId: number
): Promise<string[]> => {
    try {
        const response = await axios.get(
            `${BASE_URL}/movie/${tmdbId}/keywords`,
            {
                params: {
                    api_key: TMDB_API_KEY,
                },
            }
        );

        const keywords = response.data.keywords as TmdbKeyword[];

        return keywords.map((keyword) => keyword.name);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("TMDB error code:", error.code);
            console.error("TMDB error message:", error.message);
            console.error("Response status:", error.response?.status);
            console.error("Response data:", error.response?.data);
        } else {
            console.error("Non-axios error:", error);
        }
        throw new ApiError(502, "Failed to fetch keywords for movie");
    }
};