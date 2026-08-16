"use client";

import { Sofa, Zap, Brain, Smile, Sparkles } from "lucide-react";

const MOODS = [
    { label: "Comfort & familiar", desc: "Something easy and reassuring", icon: Sofa },
    { label: "Edge of my seat", desc: "Give me thrills and tension", icon: Zap },
    { label: "Make me think", desc: "Layered, thought-provoking stories", icon: Brain },
    { label: "Make me laugh", desc: "Light, funny, feel-good", icon: Smile },
];

export function MoodStep({
    selected,
    onChange,
}: {
    selected: string | null;
    onChange: (mood: string) => void;
}) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sparkles size={17} className="text-primary" />
            </div>
            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    What's your usual vibe?
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    What do you want most from a movie night?
                </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                {MOODS.map(({ label, desc, icon: Icon }) => {
                    const active = selected === label;
                    return (
                        <button
                            key={label}
                            onClick={() => onChange(label)}
                            className={`flex items-start gap-3 rounded-xl border p-4 text-left backdrop-blur-md transition-colors ${active
                                    ? "border-primary bg-primary/5"
                                    : "border-border/60 bg-background/50 hover:bg-accent"
                                }`}
                        >
                            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/10">
                                <Icon size={15} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{label}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}