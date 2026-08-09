"use client";

import Link from "next/link";
import { Clapperboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa6";

const perks = [
    "Personalized picks powered by AI",
    "No spoilers, ever",
    "Free, always",
];

export default function AuthPage() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4 font-sans dark:bg-black">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="w-full max-w-sm">
                <Link href="/" className="mb-8 flex items-center justify-center gap-2 group">
                    <Clapperboard
                        size={22}
                        className="text-foreground transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="text-base font-semibold tracking-tight text-foreground">
                        VibeWatch
                    </span>
                </Link>

                <Card className="rounded-2xl border-border/60 bg-background/60 shadow-sm backdrop-blur-xl">
                    <CardContent className="flex flex-col items-center gap-6 p-8">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Sparkles size={17} className="text-primary" />
                            </div>
                            <h1 className="text-xl font-semibold tracking-tight text-foreground">
                                Welcome to VibeWatch
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Sign in or create an account to get picks made for your taste.
                            </p>
                        </div>

                        <ul className="flex w-full flex-col gap-2 rounded-xl border border-border/60 bg-accent/30 px-4 py-3">
                            {perks.map((perk) => (
                                <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="h-1 w-1 flex-none rounded-full bg-primary" />
                                    {perk}
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full gap-2.5 rounded-full border-border/60 bg-background/50 backdrop-blur-md hover:bg-accent"
                            asChild
                        >
                            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
                                <FaGoogle />
                                Continue with Google
                            </a>
                        </Button>

                        <p className="text-center text-xs leading-relaxed text-muted-foreground">
                            By continuing, you agree to VibeWatch's{" "}
                            <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}