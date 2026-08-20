import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContentCard } from "./ContentCard";
import type { Movie } from "@/types/movie";

type ContentSectionProps = {
    title: string;
    movies: Movie[];
    path?: string;
};

export function ContentSection({
    title,
    movies,
    path,
}: ContentSectionProps) {
    return (
        <section>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    {title}
                </h2>

                {path && (
                    <Link
                        href={path}
                        className="group flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        View all

                        <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-0.5"
                        />
                    </Link>
                )}
            </div>

            <div className="scrollbar-none -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
                {movies.map((movie) => (
                    <ContentCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>
        </section>
    );
}