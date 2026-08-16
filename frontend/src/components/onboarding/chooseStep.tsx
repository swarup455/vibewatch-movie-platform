"use client";

import Image from "next/image";
import { Check, Heart } from "lucide-react";

const QUIZ_MOVIES = [
    { id: "1", title: "Inception", img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=300&q=80" },
    { id: "2", title: "Oppenheimer", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80" },
    { id: "3", title: "The Batman", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&q=80" },
    { id: "4", title: "Interstellar", img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&q=80" },
    { id: "5", title: "Parasite", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&q=80" },
    { id: "6", title: "Whiplash", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&q=80" },
    { id: "7", title: "Dune: Part Two", img: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=300&q=80" },
    { id: "8", title: "La La Land", img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&q=80" },
    { id: "9", title: "Get Out", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&q=80" },
];

export function ChooseStep({
    selected,
    onChange,
}: {
    selected: string[];
    onChange: (ids: string[]) => void;
}) {
    const toggle = (id: string) => {
        if (selected.includes(id)) {
            onChange(selected.filter((s) => s !== id));
        } else if (selected.length < 5) {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Heart size={17} className="text-primary" />
            </div>
            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    Pick a few movies you loved
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Choose 3–5 to help us learn your taste.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {QUIZ_MOVIES.map((movie) => {
                    const active = selected.includes(movie.id);
                    return (
                        <button
                            key={movie.id}
                            onClick={() => toggle(movie.id)}
                            className="group relative aspect-[2/3] w-24 overflow-hidden rounded-lg border border-border/60 sm:w-28"
                        >
                            <Image
                                src={movie.img}
                                alt={movie.title}
                                fill
                                className={`object-cover transition-opacity ${active ? "opacity-50" : "group-hover:opacity-80"}`}
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-1.5">
                                <p className="truncate text-[10px] font-medium text-white">
                                    {movie.title}
                                </p>
                            </div>
                            {active && (
                                <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                                    <Check size={12} className="text-primary-foreground" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}