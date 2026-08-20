// utils/tmdbImage.ts

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export function getTmdbImageUrl(
    path: string | null,
    size: "w342" | "w500" | "w780" | "w1280" = "w500"
) {
    if (!path) {
        return null;
    }

    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}