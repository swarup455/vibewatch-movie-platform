"use client";

import Image from "next/image";
import {
    Play,
    Info,
    Volume2,
    VolumeX,
    Star,
    Bookmark,
    Clock,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

type DiscoverHeroProps = {
    movie: Movie;
};

export function DiscoverHero({ movie }: DiscoverHeroProps) {
    const [muted, setMuted] = useState(true);
    const [saved, setSaved] = useState(false);

    const releaseYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : null;

    const meta = [
        ...movie.genres.slice(0, 3),
        releaseYear,
    ]
        .filter(Boolean)
        .join(" · ");

    return (
        <section className="relative flex min-h-[80vh] items-end overflow-hidden rounded-xl sm:min-h-[85vh]">
            {movie.backdropPath && (
                <Image
                    src={movie.backdropPath}
                    alt={movie.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

            <button
                onClick={() => setSaved((s) => !s)}
                className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60 sm:right-10 lg:right-16"
            >
                <Bookmark
                    size={15}
                    className={saved ? "fill-foreground" : ""}
                />
            </button>

            <div className="relative z-10 w-full px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16">
                <div className="max-w-md">
                    <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground">
                        Match of the Day
                    </p>

                    <h1 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
                        {movie.title}
                    </h1>

                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                        <span className="flex items-center gap-1 font-medium text-foreground">
                            <Star
                                size={12}
                                className="fill-amber-400 text-amber-400"
                            />
                            {movie.voteAverage.toFixed(1)}
                        </span>

                        <span className="text-border">|</span>

                        {movie.runtime && (
                            <>
                                <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {Math.floor(movie.runtime / 60)}h{" "}
                                    {movie.runtime % 60}m
                                </span>

                                <span className="text-border">|</span>
                            </>
                        )}

                        <span>{meta}</span>
                    </div>

                    {movie.overview && (
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground/90">
                            {movie.overview}
                        </p>
                    )}

                    <div className="mt-6 flex items-center gap-2">
                        <Button
                            size="sm"
                            className="gap-1.5 rounded-md px-4 transition-opacity hover:opacity-90"
                        >
                            <Play size={14} />
                            Watch Now
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1.5 rounded-md border border-border/40 bg-background/40 px-4 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60"
                        >
                            <Info size={14} />
                            More Info
                        </Button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-6 right-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60 sm:right-10 lg:right-16"
            >
                {muted ? (
                    <VolumeX size={13} />
                ) : (
                    <Volume2 size={13} />
                )}
            </button>
        </section>
    );
}