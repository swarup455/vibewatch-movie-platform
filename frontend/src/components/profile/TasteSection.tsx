// components/profile/TasteSection.tsx
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const traits = [
    { label: "Drama", value: 92 },
    { label: "Thriller", value: 87 },
    { label: "Sci-Fi", value: 81 },
    { label: "Mystery", value: 78 },
    { label: "Crime", value: 74 },
];

const spectrums = [
    { left: "Character", right: "Story", value: 62 },
    { left: "Slow", right: "Fast", value: 35 },
    { left: "Dark", right: "Light", value: 42 },
    { left: "Realistic", right: "Fantastical", value: 28 },
];

export function TasteSection({ onRetake }: { onRetake: () => void }) {
    return (
        <div>
            <div className="rounded-xl border border-border/40 bg-background/40 p-6 backdrop-blur-xl sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium tracking-wide text-muted-foreground">
                            Your Taste Test Result
                        </p>

                        <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                            The Quiet Observer
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                            You gravitate toward slow-burning, character-driven stories
                            with emotional weight — tension over spectacle, ambiguity
                            over resolution.
                        </p>
                    </div>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={onRetake}
                        className="flex-none gap-1.5 rounded-md border border-border/40 bg-background/40 px-3 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60"
                    >
                        <RotateCcw size={13} />
                        Retake test
                    </Button>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
                <div>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">
                        Your Taste
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-x-6 gap-y-6 sm:grid-cols-5 lg:grid-cols-3">
                        {traits.map((trait) => (
                            <div key={trait.label}>
                                <p className="text-xs text-muted-foreground">
                                    {trait.label}
                                </p>
                                <p className="mt-1 text-2xl font-medium tracking-tight text-foreground">
                                    {trait.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground">
                        Taste Spectrum
                    </p>

                    <div className="mt-5 flex flex-col gap-6">
                        {spectrums.map((s) => (
                            <div key={s.left} className="flex items-center gap-4">
                                <span className="w-24 flex-none text-xs font-medium text-muted-foreground">
                                    {s.left}
                                </span>

                                <div className="relative h-4 flex-1">
                                    <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-border/40" />
                                    <div
                                        className="absolute top-1/2 h-px -translate-y-1/2 bg-foreground/50"
                                        style={{ width: `${s.value}%` }}
                                    />
                                    <div
                                        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground shadow-sm"
                                        style={{ left: `${s.value}%` }}
                                    />
                                </div>

                                <span className="w-24 flex-none text-right text-xs font-medium text-muted-foreground">
                                    {s.right}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}