"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clapperboard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GenreStep } from "@/components/onboarding/GenreStep";
import { MoodStep } from "@/components/onboarding/MoodStep";
import { ChooseStep } from "@/components/onboarding/chooseStep";
import { PacingStep } from "@/components/onboarding/PacingStep";
import { EndingStep } from "@/components/onboarding/EndingStep";

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const [genres, setGenres] = useState<string[]>([]);
    const [mood, setMood] = useState<string | null>(null);
    const [movies, setMovies] = useState<string[]>([]);
    const [pacing, setPacing] = useState<string | null>(null);
    const [ending, setEnding] = useState<string | null>(null);

    const canContinue = [
        genres.length > 0,
        mood !== null,
        movies.length >= 3,
        pacing !== null,
        ending !== null,
    ][step];

    const handleNext = () => {
        if (step < TOTAL_STEPS - 1) setStep(step + 1);
        else router.push("/discover");
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4 py-10 font-sans dark:bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="w-full max-w-lg">
                <Link href="/" className="mb-6 flex items-center justify-center gap-2 group">
                    <Clapperboard
                        size={22}
                        className="text-foreground transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-base font-semibold tracking-tight text-foreground">
                        VibeWatch
                    </span>
                </Link>

                <div className="mb-6 flex items-center justify-center gap-1.5">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                        <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${i === step
                                    ? "w-6 bg-primary"
                                    : i < step
                                        ? "w-1.5 bg-primary/50"
                                        : "w-1.5 bg-border"
                                }`}
                        />
                    ))}
                </div>

                <Card className="rounded-2xl border-border/60 bg-background/60 shadow-sm backdrop-blur-xl">
                    <CardContent className="flex flex-col gap-8 p-8">
                        {step === 0 && <GenreStep selected={genres} onChange={setGenres} />}
                        {step === 1 && <MoodStep selected={mood} onChange={setMood} />}
                        {step === 2 && <ChooseStep selected={movies} onChange={setMovies} />}
                        {step === 3 && <PacingStep selected={pacing} onChange={setPacing} />}
                        {step === 4 && <EndingStep selected={ending} onChange={setEnding} />}

                        <div className="flex items-center justify-between">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                                disabled={step === 0}
                                className="gap-1.5 rounded-full text-muted-foreground disabled:opacity-0"
                            >
                                <ArrowLeft size={14} />
                                Back
                            </Button>
                            <Button
                                onClick={handleNext}
                                disabled={!canContinue}
                                className="rounded-full px-6"
                            >
                                {step === TOTAL_STEPS - 1 ? "Finish" : "Continue"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}