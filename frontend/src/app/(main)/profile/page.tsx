// app/(main)/profile/page.tsx
"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ProfileIdentity } from "@/components/profile/ProfileIdentity";
import { TasteSection } from "@/components/profile/TasteSection";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";
import { CollectionsGlimpse } from "@/components/profile/CollectionsGlimpse";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { MovieCard } from "@/components/discover/MovieCard";
import { rows } from "@/lib/movie-data";
import { collections } from "@/lib/collection-data";

export default function ProfilePage() {
    const [editOpen, setEditOpen] = useState(false);
    const [name, setName] = useState("Swarup Das");
    const [email, setEmail] = useState("swarup@example.com");

    const recommended = rows[0].movies.slice(0, 6);

    return (
        <main className="flex flex-col gap-10 px-6 py-10 sm:px-10 lg:px-16">
            <ProfileIdentity
                name={name}
                email={email}
                memberSince="August 2026"
                initials={name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                onEdit={() => setEditOpen(true)}
            />

            <Separator className="bg-border/40" />

            <ConnectedAccounts />

            <Separator className="bg-border/40" />

            <TasteSection onRetake={() => console.log("retake test")} />

            <Separator className="bg-border/40" />

            <CollectionsGlimpse collections={collections.slice(0, 4)} />

            <Separator className="bg-border/40" />

            <MovieCard title="Recommended For You" movies={recommended} />

            <EditProfileDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                name={name}
                email={email}
                onSave={(n, e) => {
                    setName(n);
                    setEmail(e);
                }}
            />
        </main>
    );
}