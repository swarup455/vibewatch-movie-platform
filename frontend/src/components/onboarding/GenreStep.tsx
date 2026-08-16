"use client";

import { Film, Sword, Laugh, Ghost, Rocket, Heart, Flame, Camera, Wand2 } from "lucide-react";

const GENRES = [
    { label: "Action", icon: Sword },
    { label: "Comedy", icon: Laugh },
    { label: "Drama", icon: Film },
    { label: "Horror", icon: Ghost },
    { label: "Sci-Fi", icon: Rocket },
    { label: "Romance", icon: Heart },
    { label: "Thriller", icon: Flame },
    { label: "Documentary", icon: Camera },
    { label: "Fantasy", icon: Wand2 },
];

export function GenreStep({
    selected,
    onChange,
}: {
    selected: string[];
    onChange: (genres: string[]) => void;
}) {
    const toggle = (label: string) => {
        onChange(
            selected.includes(label)
                ? selected.filter((g) => g !== label)
                : [...selected, label]
        );
    };

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Film size={17} className="text-primary" />
            </div>
            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    What do you love watching?
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Pick as many genres as you like.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {GENRES.map(({ label, icon: Icon }) => {
                    const active = selected.includes(label);
                    return (
                        <button
                            key={label}
                            onClick={() => toggle(label)}
                            className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-md transition-colors ${active
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-border/60 bg-background/50 text-foreground hover:bg-accent"
                                }`}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}