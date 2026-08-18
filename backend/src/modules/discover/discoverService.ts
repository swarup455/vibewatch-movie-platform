// movies.service.ts
import { fetchPopularMovies, fetchMovieVideos, fetchMovieKeywords, fetchMovieDetails } from "../../lib/tmdb.js";
import prisma from "../../lib/prisma.js";
import { movieEmbedQueue } from "../../lib/queue.js";

export async function ingestPopularMovies() {
    const popularMovies = await fetchPopularMovies();
    const savedMovies = [];

    for (const tm of popularMovies) {
        const [details, trailerKey, keywords] = await Promise.all([
            fetchMovieDetails(tm.id),
            fetchMovieVideos(tm.id),
            fetchMovieKeywords(tm.id),
        ]);

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
    }

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