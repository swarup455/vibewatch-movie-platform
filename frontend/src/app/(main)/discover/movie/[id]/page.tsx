import Link from "next/link";
import Image from "next/image";
import {
    ArrowLeft,
    Clock,
    Star,
    Calendar,
    Languages,
    Play,
} from "lucide-react";

import { getMovie } from "@/api/discover";

type MoviePageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MoviePage({
    params,
}: MoviePageProps) {
    const { id } = await params;
    const movie = await getMovie(id);

    const releaseYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : null;

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Back */}
                <Link
                    href="/discover"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft size={16} />
                    Back to Discover
                </Link>

                {/* Hero */}
                <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
                    {/* Poster */}
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-border">
                        {movie.posterPath ? (
                            <Image
                                src={movie.posterPath}
                                alt={movie.title}
                                fill
                                priority
                                sizes="(max-width: 1024px) 320px, 320px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <p className="mb-3 text-sm text-muted-foreground">
                            Movie
                        </p>

                        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                            {movie.title}
                        </h1>

                        {movie.originalTitle &&
                            movie.originalTitle !== movie.title && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {movie.originalTitle}
                                </p>
                            )}

                        {/* Metadata */}
                        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 text-foreground">
                                <Star
                                    size={15}
                                    className="fill-amber-400 text-amber-400"
                                />
                                {movie.voteAverage.toFixed(1)}
                            </span>

                            {releaseYear && (
                                <>
                                    <span className="text-border">
                                        |
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        {releaseYear}
                                    </span>
                                </>
                            )}

                            {movie.runtime && (
                                <>
                                    <span className="text-border">
                                        |
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        {Math.floor(movie.runtime / 60)}h{" "}
                                        {movie.runtime % 60}m
                                    </span>
                                </>
                            )}

                            {movie.originalLanguage && (
                                <>
                                    <span className="text-border">
                                        |
                                    </span>

                                    <span className="flex items-center gap-1.5">
                                        <Languages size={14} />
                                        {movie.originalLanguage.toUpperCase()}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Genres */}
                        {movie.genres.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {movie.overview && (
                            <p className="mt-6 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                {movie.overview}
                            </p>
                        )}

                        {/* Trailer button */}
                        {movie.youtubeTrailerId && (
                            <a
                                href="#trailer"
                                className="mt-7 inline-flex w-fit items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                            >
                                <Play size={15} />
                                Watch Trailer
                            </a>
                        )}
                    </div>
                </section>

                {/* Trailer */}
                {movie.youtubeTrailerId && (
                    <section
                        id="trailer"
                        className="mt-14"
                    >
                        <h2 className="mb-5 text-xl font-medium tracking-tight text-foreground">
                            Trailer
                        </h2>

                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                            <iframe
                                src={`https://www.youtube.com/embed/${movie.youtubeTrailerId}`}
                                title={`${movie.title} trailer`}
                                className="absolute inset-0 h-full w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    </section>
                )}

                {/* Keywords */}
                {movie.keywords.length > 0 && (
                    <section className="mt-14">
                        <h2 className="mb-5 text-xl font-medium tracking-tight text-foreground">
                            Keywords
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {movie.keywords.map((keyword) => (
                                <span
                                    key={keyword}
                                    className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}