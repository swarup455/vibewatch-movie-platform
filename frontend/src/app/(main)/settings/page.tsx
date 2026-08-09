// app/(main)/settings/page.tsx
"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AccountSection } from "@/components/settings/AccountSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { ConnectedAccounts } from "@/components/profile/ConnectedAccounts";
import { DangerZone } from "@/components/settings/DangerZone";

export default function SettingsPage() {
    const [name, setName] = useState("Swarup Das");
    const [email, setEmail] = useState("swarup@example.com");

    return (
        <main className="flex flex-col gap-10 px-6 py-10 sm:px-10 lg:px-16">
            <div>
                <h1 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    Settings
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your account, preferences, and connections
                </p>
            </div>

            <Separator className="bg-border/40" />

            <AccountSection
                name={name}
                email={email}
                onSave={(n, e) => {
                    setName(n);
                    setEmail(e);
                }}
            />

            <Separator className="bg-border/40" />

            <PreferencesSection />

            <Separator className="bg-border/40" />

            <ConnectedAccounts />

            <Separator className="bg-border/40" />

            <DangerZone onLogout={() => console.log("logout")} />
        </main>
    );
}