// app/(main)/collections/page.tsx
"use client";

import { useState } from "react";
import { Library } from "lucide-react";
import { collections as initialCollections } from "@/lib/collection-data";
import { Collection } from "@/types/collection";
import { CollectionsGrid } from "@/components/collections/CollectionsGrid";
import { CreateCollectionDialog } from "@/components/collections/CreateCollectionDialog";

export default function CollectionsPage() {
    const [collections, setCollections] = useState<Collection[]>(
        initialCollections
    );

    const handleCreate = (name: string) => {
        setCollections((prev) => [
            { id: crypto.randomUUID(), name, movies: [] },
            ...prev,
        ]);
    };

    return (
        <main className="flex flex-col gap-6 px-6 py-10 sm:px-10 lg:px-16">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Library size={18} className="text-muted-foreground" />
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                            Collections
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {collections.length}{" "}
                            {collections.length === 1 ? "collection" : "collections"}
                        </p>
                    </div>
                </div>

                <CreateCollectionDialog onCreate={handleCreate} />
            </div>

            <CollectionsGrid collections={collections} onCreate={handleCreate} />
        </main>
    );
}