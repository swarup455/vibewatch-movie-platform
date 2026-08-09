// components/settings/SettingsRow.tsx
export function SettingsRow({
    label,
    description,
    children,
}: {
    label: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-6">
            <div>
                <p className="text-sm text-foreground">{label}</p>
                {description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            <div className="flex-none">{children}</div>
        </div>
    );
}