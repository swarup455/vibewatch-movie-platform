import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Movie } from "@/types/movie";

type ContentCardProps = {
    movie: Movie;
    variant?: "landscape" | "portrait";
};

export function ContentCard({
    movie,
    variant = "landscape",
}: ContentCardProps) {
    const isPortrait = variant === "portrait";

    const imageSrc = isPortrait
        ? movie.posterPath || movie.backdropPath
        : movie.backdropPath || movie.posterPath;

    return (
        <div
            className={
                isPortrait
                    ? "w-[180px] flex-none"
                    : "w-[220px] flex-none sm:w-[260px]"
            }
        >
            <Link
                href={`/discover/movie/${movie.id}`}
                className="block"
            >
                <Card className="group cursor-pointer overflow-hidden rounded-md border-border/40 bg-card p-0 transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-0">
                        <div
                            className={
                                isPortrait
                                    ? "relative aspect-[2/3] w-full overflow-hidden"
                                    : "relative aspect-video w-full overflow-hidden"
                            }
                        >
                            {imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={movie.title}
                                    fill
                                    sizes={
                                        isPortrait
                                            ? "180px"
                                            : "(min-width: 640px) 260px, 220px"
                                    }
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                                    No Image
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div
                    className={
                        isPortrait
                            ? "mt-2 text-center"
                            : "mt-2.5 flex flex-col items-center text-center"
                    }
                >
                    <p
                        className={
                            isPortrait
                                ? "w-full truncate text-sm font-semibold tracking-tight text-foreground"
                                : "w-full truncate text-sm font-semibold tracking-tight text-foreground"
                        }
                    >
                        {movie.title}
                    </p>

                    {!isPortrait && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium text-foreground">
                                <Star
                                    size={11}
                                    className="fill-amber-400 text-amber-400"
                                />
                                {movie.voteAverage.toFixed(1)}
                            </span>

                            <span className="text-border">|</span>

                            <span>
                                {movie.releaseDate
                                    ? new Date(
                                        movie.releaseDate
                                    ).getFullYear()
                                    : "N/A"}
                            </span>

                            {movie.genres.length > 0 && (
                                <>
                                    <span className="text-border">|</span>

                                    <span className="max-w-[100px] truncate">
                                        {movie.genres[0]}
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    );
}