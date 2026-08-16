"use client";

import { Drama, Smile, CloudRain, Dices } from "lucide-react";

const ENDINGS = [
    { label: "Happy endings", desc: "Leave me feeling good", icon: Smile },
    { label: "Dark or ambiguous", desc: "I don't mind an unresolved ending", icon: CloudRain },
    { label: "Depends on my mood", desc: "No strong preference", icon: Dices },
];

export function EndingStep({
    selected,
    onChange,
}: {
    selected: string | null;
    onChange: (ending: string) => void;
}) {
    return (
        <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Drama size={17} className="text-primary" />
            </div>
            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                    One last thing
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    How do you feel about how a story wraps up?
                </p>
            </div>

            <div className="flex w-full flex-col gap-2">
                {ENDINGS.map(({ label, desc, icon: Icon }) => {
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