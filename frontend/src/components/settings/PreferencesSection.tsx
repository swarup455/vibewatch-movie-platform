"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { SettingsGroup } from "@/components/settings/SettingsGroup";
import { SettingsRow } from "./SettingsRow";

export function PreferencesSection() {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const [weeklyDigest, setWeeklyDigest] = useState(true);

    return (
        <SettingsGroup title="Preferences">

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