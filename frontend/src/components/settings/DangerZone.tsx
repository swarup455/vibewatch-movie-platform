// components/settings/DangerZone.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Trash2 } from "lucide-react";
import { SignOutDialog } from "../shared/SignOutDialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

export function DangerZone({ onLogout }: { onLogout: () => void }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [signOutOpen, setSignOutOpen] = useState(false);

    return (
        <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
                Danger Zone
            </p>

            <div className="mt-5 flex flex-col gap-6">
                <div className="flex items-center justify-between gap-6">
                    <div>
                        <p className="text-sm text-foreground">Sign out</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            End your session on this device
                        </p>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSignOutOpen(true)}
                        className="gap-1.5 rounded-md border border-border/40 bg-background/40 px-3 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60"
                    >
                        <LogOut size={13} />
                        Sign out
                    </Button>
                </div>

                <div className="flex items-center justify-between gap-6">
                    <div>
                        <p className="text-sm text-destructive">Delete account</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Permanently remove your account and all data
                        </p>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setConfirmOpen(true)}
                        className="gap-1.5 rounded-md border border-destructive/30 bg-destructive/5 px-3 text-destructive transition-colors hover:bg-destructive/10"
                    >
                        <Trash2 size={13} />
                        Delete
                    </Button>
                </div>
            </div>

            <SignOutDialog
                open={signOutOpen}
                onOpenChange={setSignOutOpen}
                onConfirm={() => {
                    onLogout();
                    setSignOutOpen(false);
                }}
            />

            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="rounded-xl border-border/60 bg-background/80 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="text-base font-medium">
                            Delete account
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            This permanently deletes your account, taste profile, and
                            collections. This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmOpen(false)}
                            className="rounded-md"
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            className="rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => setConfirmOpen(false)}
                        >
                            Delete permanently
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}