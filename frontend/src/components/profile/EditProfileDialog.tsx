// components/profile/EditProfileDialog.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

export function EditProfileDialog({
    open,
    onOpenChange,
    name,
    email,
    onSave,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    name: string;
    email: string;
    onSave: (name: string, email: string) => void;
}) {
    const [localName, setLocalName] = useState(name);
    const [localEmail, setLocalEmail] = useState(email);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-xl border-border/60 bg-background/80 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-base font-medium">
                        Edit profile
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="name" className="text-xs text-muted-foreground">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={localName}
                            onChange={(e) => setLocalName(e.target.value)}
                            className="h-9 rounded-lg text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email" className="text-xs text-muted-foreground">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={localEmail}
                            onChange={(e) => setLocalEmail(e.target.value)}
                            className="h-9 rounded-lg text-sm"
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        size="sm"
                        className="rounded-full px-5"
                        onClick={() => {
                            onSave(localName, localEmail);
                            onOpenChange(false);
                        }}
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}