// components/profile/ConnectedAccounts.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function RedditIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0C4.477 0 0 4.477 0 10c0 2.61.997 4.987 2.63 6.77-.13.487-.474 1.77-.61 2.27-.15.55.2.54.42.39.18-.12 2.13-1.45 2.98-2.02A9.96 9.96 0 0 0 10 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm5.5 10.5c0 .5-.4.9-.9.9-.19 0-.36-.06-.5-.16-1.02.71-2.42 1.17-3.98 1.22l.68-3.2 2.22.47a.65.65 0 1 0 .08-.42l-2.48-.53a.22.22 0 0 0-.26.17l-.76 3.56c-1.55-.06-2.93-.52-3.94-1.23a.9.9 0 0 0-.5.16.9.9 0 1 1 .93-1.53c.86-.6 2.04-.99 3.35-1.06l.6-2.83a.22.22 0 0 1 .26-.17l1.98.42a.86.86 0 1 1-.08.42l-1.77-.38-.53 2.5c1.28.07 2.44.46 3.29 1.04a.9.9 0 0 1 1.31.83zm-8 .5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zm5 2.15c-.53.35-1.31.53-2 .53s-1.47-.18-2-.53a.2.2 0 0 1 .22-.33c.44.29 1.1.44 1.78.44s1.34-.15 1.78-.44a.2.2 0 1 1 .22.33zm.5-1.4a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
        </svg>
    );
}

export function ConnectedAccounts() {
    const [connected, setConnected] = useState(false);

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground">
                    Connected Accounts
                </p>
                <p className="mt-1 text-sm text-foreground">
                    Link Reddit to refine your taste from your saved threads
                </p>
            </div>

            <Button
                size="sm"
                variant="ghost"
                onClick={() => setConnected((c) => !c)}
                className={`gap-1.5 rounded-md border px-3 backdrop-blur-xl transition-colors ${connected
                        ? "border-border/40 bg-background/40 text-foreground hover:bg-background/60"
                        : "border-transparent bg-[#FF4500] text-white hover:bg-[#E63E00]"
                    }`}
            >
                {connected ? (
                    <>
                        <Check size={13} />
                        Connected
                    </>
                ) : (
                    <>
                        <RedditIcon />
                        Connect Reddit
                    </>
                )}
            </Button>
        </div>
    );
}