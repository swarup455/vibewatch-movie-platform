// components/settings/AccountSection.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";

export function AccountSection({
    name,
    email,
    onSave,
}: {
    name: string;
    email: string;
    onSave: (name: string, email: string) => void;
}) {
    const [editOpen, setEditOpen] = useState(false);
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");

    return (
        <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
                Account
            </p>

            <div className="mt-5 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border border-border/40">
                        <AvatarFallback className="bg-muted text-sm font-medium text-foreground">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-foreground">{name}</p>
                        <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                </div>

                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditOpen(true)}
                    className="gap-1.5 rounded-md border border-border/40 bg-background/40 px-3 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60"
                >
                    <Pencil size={13} />
                    Edit
                </Button>
            </div>

            <EditProfileDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                name={name}
                email={email}
                onSave={onSave}
            />
        </div>
    );
}