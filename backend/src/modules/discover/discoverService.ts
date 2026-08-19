// movies.service.ts
import {
    fetchPopularMoviesPage,
    fetchMovieVideos,
    fetchMovieKeywords,
    fetchMovieDetails,
} from "../../lib/tmdb.js";
import prisma from "../../lib/prisma.js";
import { movieEmbedQueue } from "../../lib/queue.js";

const TARGET_MOVIE_COUNT = 3000;
const DELAY_MS = 1500;

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === retries) throw err;
            console.warn(`Retrying after error (attempt ${attempt}/${retries})...`);
            await new Promise((r) => setTimeout(r, delayMs * attempt)); // backoff
        }
    }
    throw new Error("unreachable");
}

export async function ingestPopularMovies() {
    const currentCount = await prisma.movie.count();
    console.log(`Currently have ${currentCount} movies. Target: ${TARGET_MOVIE_COUNT}`);

    if (currentCount >= TARGET_MOVIE_COUNT) {
        console.log("Target already met. Nothing to do.");
        return [];
    }

    const savedMovies = [];
    let page = 1;
    let totalPages = Infinity;
    let dbCount = currentCount;

    while (dbCount < TARGET_MOVIE_COUNT && page <= totalPages) {
        console.log(`Fetching page ${page}...`);
        const { results, totalPages: tp } = await fetchPopularMoviesPage(page);
        totalPages = tp;

        for (const tm of results) {
            const details = await withRetry(() => fetchMovieDetails(tm.id));
            const trailerKey = await withRetry(() => fetchMovieVideos(tm.id));
            const keywords = await withRetry(() => fetchMovieKeywords(tm.id));

            const movie = await prisma.movie.upsert({
                where: { tmdbId: tm.id },
                update: {
                    popularity: tm.popularity,
                    voteAverage: tm.vote_average,
                    voteCount: tm.vote_count,
                },
                create: {
                    tmdbId: tm.id,
                    imdbId: details.imdb_id,
                    title: tm.title,
                    originalTitle: details.original_title,
                    overview: tm.overview,
                    genres: details.genres.map((g: any) => g.name),
                    keywords,
                    releaseDate: tm.release_date ? new Date(tm.release_date) : null,
                    runtime: details.runtime,
                    originalLanguage: tm.original_language,
                    posterPath: tm.poster_path,
                    backdropPath: tm.backdrop_path,
                    youtubeTrailerId: trailerKey,
                    popularity: tm.popularity,
                    voteAverage: tm.vote_average,
                    voteCount: tm.vote_count,
                },
            });

            savedMovies.push(movie);

            dbCount = await prisma.movie.count();
            if (dbCount >= TARGET_MOVIE_COUNT) break;

            await sleep(DELAY_MS);
        }

        page++;
    }

    console.log(`Ingestion finished. DB now has ${dbCount} movies.`);
    return savedMovies;
}

export async function enqueueMoviesForEmbedding(movies: { id: string; popularity: number }[]) {
    const sorted = [...movies].sort((a, b) => b.popularity - a.popularity);

    for (const [index, movie] of sorted.entries()) {
        await movieEmbedQueue.add(
            "embed-movie",
            { movieId: movie.id },
            { priority: index + 1 }
        );
    }
}