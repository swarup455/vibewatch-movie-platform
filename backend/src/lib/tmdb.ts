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

// Fetch a page of popular movies (basic fields only — title, overview, popularity, etc.)
export async function fetchPopularMovies(page = 1) {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
    if (!res.ok) throw new Error(`TMDB fetchPopularMovies failed: ${res.status}`);
    const data = await res.json();
    return data.results as any[];
}

// Fetch full movie details (runtime, original_title, original_language, genres, imdb_id, etc.)
export async function fetchMovieDetails(tmdbId: number) {
    const res = await fetch(`${BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error(`TMDB fetchMovieDetails failed for ${tmdbId}: ${res.status}`);
    return res.json();
}

// Fetch trailer video key (YouTube video ID), preferring official trailers
export async function fetchMovieVideos(tmdbId: number): Promise<string | null> {
    const res = await fetch(`${BASE_URL}/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error(`TMDB fetchMovieVideos failed for ${tmdbId}: ${res.status}`);
    const data = await res.json();
    const videos = data.results as TmdbVideo[];

    const officialTrailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official);
    const anyTrailer = videos.find((v) => v.site === "YouTube" && v.type === "Trailer");

    return officialTrailer?.key ?? anyTrailer?.key ?? null;
}

// Fetch keyword tags for a movie
export async function fetchMovieKeywords(tmdbId: number): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/movie/${tmdbId}/keywords?api_key=${TMDB_API_KEY}`);
    if (!res.ok) throw new Error(`TMDB fetchMovieKeywords failed for ${tmdbId}: ${res.status}`);
    const data = await res.json();
    return (data.keywords as TmdbKeyword[]).map((k) => k.name);
}