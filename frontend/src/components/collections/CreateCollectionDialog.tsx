// components/collections/CreateCollectionDialog.tsx
"use client";

import { useState } from "react";
import { Plus, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

export function CreateCollectionDialog({
    onCreate,
}: {
    onCreate: (name: string) => void;
}) {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const handleCreate = () => {
        if (!name.trim()) return;
        onCreate(name.trim());
        setName("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="gap-1.5 rounded-md px-4"
                >
                    <Plus size={14} />
                    New Collection
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-xl border-border/60 bg-background/80 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base">
                        <FolderPlus size={17} />
                        Create collection
                    </DialogTitle>
                </DialogHeader>

                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Weekend Watchlist"
                    className="h-9 rounded-lg text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                />

                <DialogFooter>
                    <Button
                        size="sm"
                        className="rounded-full px-5"
                        onClick={handleCreate}
                        disabled={!name.trim()}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}