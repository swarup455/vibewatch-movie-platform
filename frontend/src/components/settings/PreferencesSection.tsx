// components/settings/PreferencesSection.tsx
"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { SettingsGroup } from "@/components/settings/SettingsGroup";
import { SettingsRow } from "./SettingsRow";

export function PreferencesSection() {
    const { theme, setTheme } = useTheme();
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [weeklyDigest, setWeeklyDigest] = useState(true);

    return (
        <SettingsGroup title="Preferences">
            <SettingsRow
                label="Dark mode"
                description="Use a dark appearance across VibeWatch"
            >
                <Switch
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                        setTheme(checked ? "dark" : "light")
                    }
                />
            </SettingsRow>

            <SettingsRow
                label="Email notifications"
                description="New matches and recommendation updates"
            >
                <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
            </SettingsRow>

            <SettingsRow
                label="Push notifications"
                description="Alerts on this device"
            >
                <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
            </SettingsRow>

            <SettingsRow
                label="Weekly digest"
                description="A summary of picks every Monday"
            >
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
            </SettingsRow>
        </SettingsGroup>
    );
}