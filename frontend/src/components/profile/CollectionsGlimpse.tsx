// components/profile/CollectionsGlimpse.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Collection } from "@/types/collection";
import { CollectionCard } from "@/components/collections/CollectionCard";

export function CollectionsGlimpse({
    collections,
}: {
    collections: Collection[];
}) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-wide text-muted-foreground">
                    Your Collections
                </p>

                <Link
                    href="/collections"
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    View all
                    <ArrowRight size={12} />
                </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>
        </div>
    );
}