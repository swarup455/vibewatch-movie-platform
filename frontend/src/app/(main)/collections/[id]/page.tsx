// app/(main)/collections/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { collections } from "@/lib/collection-data";
import { MovieCard } from "@/components/discover/ContentSection";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CollectionDetailPage({ params }: Props) {
    const { id } = await params;

    const collection = collections.find((c) => c.id === id);

    if (!collection) notFound();

    return (
        <main className="flex flex-col gap-6 px-6 py-10 sm:px-10 lg:px-16">
            <Link
                href="/collections"
                className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft size={15} />
                Collections
            </Link>

            <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {collection.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {collection.movies.length}{" "}
                    {collection.movies.length === 1 ? "title" : "titles"}
                </p>
            </div>

            {collection.movies.length > 0 ? (
                <MovieCard title="" movies={collection.movies} />
            ) : (
                <p className="text-sm text-muted-foreground">
                    No movies in this collection yet.
                </p>
            )}
        </main>
    );
}