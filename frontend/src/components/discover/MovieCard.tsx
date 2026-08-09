import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Movie } from "@/types/movie";

export function MovieCard({
    title,
    movies,
}: {
    title: string;
    movies: Movie[];
}) {
    return (
        <section>
            <div>
                <h2 className="mb-4 text-lg font-medium tracking-tight text-foreground sm:text-xl">
                    {title}
                </h2>

                <div className="scrollbar-none -mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
                    {movies.map((movie) => (
                        <div
                            key={movie.title}
                            className="w-[220px] flex-none sm:w-[260px]"
                        >
                            <Card className="group cursor-pointer overflow-hidden rounded-md border-border/40 bg-card p-0 transition-all duration-300 hover:-translate-y-1">
                                <CardContent className="p-0">
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={movie.img}
                                            alt={movie.title}
                                            fill
                                            sizes="(min-width: 640px) 260px, 220px"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="mt-2.5 flex flex-col items-center text-center">
                                <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                                    {movie.title}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1 font-medium text-foreground">
                                        <Star size={11} className="fill-amber-400 text-amber-400" />
                                        {movie.match / 10}
                                    </span>
                                    <span className="text-border">|</span>
                                    <span>{movie.year}</span>
                                    {movie.genre && (
                                        <>
                                            <span className="text-border">|</span>
                                            <span className="truncate">{movie.genre}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}