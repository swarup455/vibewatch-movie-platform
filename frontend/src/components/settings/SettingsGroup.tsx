// components/settings/SettingsGroup.tsx
export function SettingsGroup({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground">
                {title}
            </p>
            <div className="mt-5 flex flex-col gap-6">{children}</div>
        </div>
    );
}