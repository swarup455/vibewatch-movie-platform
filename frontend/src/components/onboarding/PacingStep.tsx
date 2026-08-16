"use client";

import { Gauge, Turtle, Rabbit, Shuffle } from "lucide-react";

const PACING = [
    { label: "Slow burn", desc: "Character-driven, takes its time", icon: Turtle },
    { label: "Fast paced", desc: "Keep the plot moving", icon: Rabbit },
    { label: "No preference", desc: "I like a bit of both", icon: Shuffle },
];

export function PacingStep({
    selected,
    onChange,
}: {
    selected: string | null;
    onChange: (pacing: string) => void;
}) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Gauge size={17} className="text-primary" />
            </div>
            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    How do you like it paced?
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Slow and immersive, or quick and gripping?
                </p>
            </div>

            <div className="flex w-full flex-col gap-2">
                {PACING.map(({ label, desc, icon: Icon }) => {
                    const active = selected === label;
                    return (
                        <button
                            key={label}
                            onClick={() => onChange(label)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left backdrop-blur-md transition-colors ${active
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