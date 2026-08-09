// components/profile/ProfileIdentity.tsx
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export function ProfileIdentity({
    name,
    email,
    memberSince,
    initials,
    onEdit,
}: {
    name: string;
    email: string;
    memberSince: string;
    initials: string;
    onEdit: () => void;
}) {
    return (
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border border-border/40">
                    <AvatarFallback className="bg-muted text-sm font-medium text-foreground">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div>
                    <h1 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                        {name}
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">{email}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                        Member since {memberSince}
                    </p>
                </div>
            </div>

            <Button
                size="sm"
                variant="ghost"
                onClick={onEdit}
                className="gap-1.5 rounded-md border border-border/40 bg-background/40 px-3 text-foreground backdrop-blur-xl transition-colors hover:bg-background/60"
            >
                <Pencil size={13} />
                Edit
            </Button>
        </div>
    );
}