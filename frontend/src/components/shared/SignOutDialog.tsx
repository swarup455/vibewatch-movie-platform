// components/settings/SignOutDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

export function SignOutDialog({
    open,
    onOpenChange,
    onConfirm,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="rounded-xl border-border/60 bg-background/80 backdrop-blur-xl sm:max-w-sm">
                <DialogHeader>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/40">
                        <LogOut size={15} className="text-foreground" />
                    </div>
                    <DialogTitle className="mt-3 text-base font-medium">
                        Sign out of VibeWatch?
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        You'll need to sign in again to see your recommendations and
                        collections.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2 sm:gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="rounded-md border border-border/40 bg-background/40 text-foreground hover:bg-background/60"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        onClick={onConfirm}
                        className="gap-1.5 rounded-md"
                    >
                        <LogOut size={13} />
                        Sign out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}