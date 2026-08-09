// lib/collection-data.ts
import { Collection } from "@/types/collection";
import { rows } from "@/lib/movie-data";

const allMovies = Array.from(
    new Map(
        rows.flatMap((row) => row.movies).map((movie) => [movie.title, movie])
    ).values()
);

export const collections: Collection[] = [
    {
        id: "weekend-watchlist",
        name: "Weekend Watchlist",
        movies: allMovies.slice(0, 6),
    },
    {
        id: "late-night-thrillers",
        name: "Late Night Thrillers",
        movies: allMovies.slice(4, 10),
    },
    {
        id: "comfort-rewatches",
        name: "Comfort Rewatches",
        movies: allMovies.slice(8, 13),
    },
];