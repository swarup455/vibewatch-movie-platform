"use client";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <main className="flex min-h-125 flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold">
                Failed to load movies
            </h2>

            <p className="text-sm text-muted-foreground">
                Something went wrong while loading the discover page.
            </p>

            <button
                onClick={() => reset()}
                className="rounded-md bg-white px-4 py-2 text-black"
            >
                Try again
            </button>
        </main>
    );
}