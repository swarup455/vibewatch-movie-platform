// types/collection.ts
import { Movie } from "@/types/movie";

export interface Collection {
    id: string;
    name: string;
    movies: Movie[];
}