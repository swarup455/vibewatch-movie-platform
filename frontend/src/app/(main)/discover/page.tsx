"use client";

import Image from "next/image";
import { Play, Info, ChevronRight, Star, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const heroShow = {
    title: "The Bombing of Pan Am 103",
    match: 91,
    meta: "Drama · TV-MA · 2025 · 1 Season",
    desc: "On December 21, 1988, Pan Am Flight 103 exploded over the small Scottish town of Lockerbie, killing 270 people. What followed was the largest murder investigation in British history.",
    img: "https://images.unsplash.com/photo-1489599162946-a7d8b3f8c9e7?w=1200&q=80",
};

type Movie = { title: string; match: number; img: string };

const rows: { title: string; movies: Movie[] }[] = [
    {
        title: "Top Matches",
        movies: [
            { title: "No Country for Old Men", match: 99, img: "https://images.unsplash.com/photo-1489599162946-a7d8b3f8c9e7?w=400&q=80" },
            { title: "Breaking Bad", match: 99, img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
            { title: "When They See Us", match: 98, img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
            { title: "Better Call Saul", match: 98, img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80" },
            { title: "Dune: Part Two", match: 97, img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80" },
            { title: "Peaky Blinders", match: 96, img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&q=80" },
        ],
    },
    {
        title: "Something Serious",
        movies: [
            { title: "Dune", match: 86, img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80" },
            { title: "Stranger Things", match: 82, img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
            { title: "Fight Club", match: 89, img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
            { title: "Dark", match: 82, img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&q=80" },
            { title: "I Will Find You", match: 78, img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80" },
            { title: "Beef", match: 84, img: "https://images.unsplash.com/photo-1489599162946-a7d8b3f8c9e7?w=400&q=80" },
        ],
    },
    {
        title: "Simple & Light",
        movies: [
            { title: "Spider-Man 2", match: 71, img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80" },
            { title: "Friends", match: 76, img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
            { title: "Jurassic Park", match: 75, img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&q=80" },
            { title: "Stand by Me", match: 74, img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
            { title: "Kung Fu Panda", match: 79, img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80" },
            { title: "Remarkably Bright Creatures", match: 70, img: "https://images.unsplash.com/photo-1489599162946-a7d8b3f8c9e7?w=400&q=80" },
        ],
    },
    {
        title: "Hidden Gems",
        movies: [
            { title: "Companion", match: 72, img: "https://images.unsplash.com/photo-1489599162946-a7d8b3f8c9e7?w=400&q=80" },
            { title: "The Gentlemen", match: 82, img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&q=80" },
            { title: "Pantheon", match: 77, img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80" },
            { title: "No Reservations", match: 70, img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
            { title: "Dark", match: 82, img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
            { title: "Dune", match: 86, img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&q=80" },
        ],
    },
];

function matchColor(match: number) {
    if (match >= 90) return "text-emerald-400";
    if (match >= 75) return "text-lime-400";
    if (match >= 60) return "text-amber-400";
    return "text-zinc-400";
}

function MovieRow({ title, movies }: { title: string; movies: Movie[] }) {
    return (
        <section className="bg-transparent">
            <div className="mx-auto max-w-7xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="flex items-center gap-1 text-base font-semibold tracking-tight text-white">
                        {title}
                        <ChevronRight size={16} className="text-zinc-500" />
                    </h2>
                </div>

                <div className="scrollbar-none -mx-1 flex gap-5 overflow-x-auto px-1 pb-2">
                    {movies.map((movie) => (
                        <div key={movie.title} className="w-[170px] flex-none sm:w-[210px]">
                            <Card className="group cursor-pointer overflow-hidden rounded-2xl border-white/10 bg-white/5 p-0 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20">
                                <CardContent className="p-0">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden">
                                        <Image
                                            src={movie.img}
                                            alt={movie.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <span className={`absolute right-2.5 top-2.5 text-xs font-semibold ${matchColor(movie.match)}`}>
                                            {movie.match}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                            <p className="mt-2.5 truncate text-sm font-medium text-zinc-200">
                                {movie.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function DiscoverPage() {
    const [muted, setMuted] = useState(true);

    return (
        <main className="flex flex-col bg-transparent pb-16">
            {/* HERO */}
            <section className="relative flex min-h-[70vh] items-end overflow-hidden rounded-b-3xl border-b border-white/5 sm:min-h-[75vh]">
                <Image
                    src={heroShow.img}
                    alt={heroShow.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

                <div className="relative z-10 w-full px-6 pb-10 sm:px-10 lg:px-16">
                    <div className="max-w-xl">
                        <Badge
                            variant="outline"
                            className="mb-4 rounded-full border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-300 backdrop-blur-md"
                        >
                            Match of the Day
                        </Badge>

                        <p className={`mb-1 text-sm font-semibold ${matchColor(heroShow.match)}`}>
                            {heroShow.match}% Match
                        </p>

                        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            {heroShow.title}
                        </h1>

                        <p className="mt-2 text-xs text-zinc-400 sm:text-sm">{heroShow.meta}</p>

                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
                            {heroShow.desc}
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <Button size="lg" className="gap-2 rounded-full bg-white px-6 text-black hover:bg-zinc-200">
                                <Play size={16} className="fill-black" /> Watch Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="gap-2 rounded-full border-white/20 bg-white/5 px-6 text-white backdrop-blur-md hover:bg-white/10"
                            >
                                <Info size={16} /> More Info
                            </Button>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setMuted((m) => !m)}
                    className="absolute bottom-8 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:right-10 lg:right-16"
                >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
            </section>

            {/* ROWS */}
            <div className="mt-4 flex flex-col">
                {rows.map((row) => (
                    <MovieRow key={row.title} title={row.title} movies={row.movies} />
                ))}
            </div>

            {/* PROFILE STRENGTH */}
            <section className="py-5">
                <div className="w-full">
                    <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-md">
                        <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                            <div>
                                <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                                    <Star size={14} className="fill-amber-400 text-amber-400" />
                                    Low Profile Strength
                                </p>
                                <p className="mt-1 text-xs text-zinc-400">
                                    Rate more movies to sharpen your recommendations.
                                </p>
                                <div className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[30%] rounded-full bg-white" />
                                </div>
                                <p className="mt-1.5 text-[11px] text-zinc-500">30% Complete</p>
                            </div>
                            <Button className="rounded-full bg-white px-6 text-black hover:bg-zinc-200">
                                Keep Rating
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    );
}