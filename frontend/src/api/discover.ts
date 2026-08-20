import serverApi from "@/lib/server-api";
import { Movie } from "@/types/movie";

export async function getMovies(): Promise<Movie[]> {
    try {
        const response = await serverApi.get("/api/discover/fetch-movies");
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        throw new Error("Failed to load movies");
    }
}

export async function getMovie(id: string): Promise<Movie> {
    try {
        const response = await serverApi.get<{ data: Movie }>(
            `/api/discover/movie/${id}`
        );

        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch movie:", error);
        throw new Error("Failed to load movie");
    }
}