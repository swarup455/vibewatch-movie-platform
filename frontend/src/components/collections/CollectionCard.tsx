// components/collections/CollectionCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Collection } from "@/types/collection";

export function CollectionCard({ collection }: { collection: Collection }) {
    const covers = collection.movies.slice(0, 4);
    const remaining = collection.movies.length - covers.length;

    return (
        <Link href={`/collections/${collection.id}`} className="group block">
            <div className="flex h-40 aspect-video items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-border">
                <div className="flex items-center">
                    {covers.map((movie, i) => (
                        <div
                            key={movie.title + i}
                            className="relative -ml-5 h-14 w-14 flex-none overflow-hidden rounded-full border-2 border-card bg-muted shadow-sm first:ml-0"
                            style={{ zIndex: covers.length - i }}
                        >
                            <Image
                                src={movie.img}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                            />
                        </div>
                    ))}

                    {remaining > 0 && (
                        <div
                            className="relative -ml-5 flex h-14 w-14 flex-none items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium text-muted-foreground"
                            style={{ zIndex: 0 }}
                        >
                            +{remaining}
                        </div>
                    )}

                    {covers.length === 0 && (
                        <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full border-2 border-dashed border-border/60 text-xs text-muted-foreground">
                            0
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-3 text-center">
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                    {collection.name}
                </p>
                <p className="text-xs text-muted-foreground">
                    {collection.movies.length}{" "}
                    {collection.movies.length === 1 ? "title" : "titles"}
                </p>
            </div>
        </Link>
    );
}