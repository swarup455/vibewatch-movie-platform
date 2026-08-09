// components/collections/CollectionsGrid.tsx
import { Collection } from "@/types/collection";
import { CollectionCard } from "@/components/collections/CollectionCard";

export function CollectionsGrid({ collections }: { collections: Collection[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
            {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
            ))}
        </div>
    );
}