"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
    { href: "/discover", label: "Discover" },
    { href: "/chat", label: "Ask AI" },
    { href: "/collections", label: "Collections" },
];

const isAuthenticated = true; // swap with real auth

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-6xl bg-background/70 backdrop-blur-md shadow-sm">
                <div className="flex h-14 items-center justify-between px-6">

                    <Link href="/" className="flex items-center gap-2 group">
                        <Clapperboard
                            size={20}
                            className="text-foreground transition-transform duration-200 group-hover:scale-110"
                        />
                        <span className="text-sm font-semibold tracking-tight text-foreground">
                            VibeWatch
                        </span>
                    </Link>

                    {/* CENTER — Nav links */}
                    <nav className="flex items-center gap-1">
                        {NAV_LINKS.map(({ href, label }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`relative px-4 py-1.5 text-sm transition-colors duration-200 ${active
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {label}
                                    {active && (
                                        <span className="absolute inset-x-2 -bottom-px h-px bg-foreground transition-all duration-300" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* RIGHT — Auth */}
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 cursor-pointer ring-1 ring-border transition-all hover:ring-2 hover:ring-foreground/30">
                                    <AvatarFallback className="text-xs font-medium">
                                        SD
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44 rounded-xl">
                                <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                    <User size={14} /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                    <Settings size={14} /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="gap-2 text-sm text-destructive cursor-pointer focus:text-destructive">
                                    <LogOut size={14} /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button size="sm" className="rounded-lg text-sm h-8 px-4">
                            Get Started
                        </Button>
                    )}

                </div>
            </div>
        </header>
    );
}