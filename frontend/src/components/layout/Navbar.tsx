"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 flex justify-center px-4">
            <div className="w-full max-w-6xl bg-background/70 backdrop-blur-md shadow-sm">
                <div className="flex h-14 items-center justify-between gap-4 px-6">

                    {/* LEFT — Search */}
                    <div className="relative w-full max-w-sm">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            type="search"
                            placeholder="Search movies, shows..."
                            className="pl-9 h-9 rounded-lg text-sm"
                        />
                    </div>

                    {/* RIGHT — Notifications + Theme toggle */}
                    <div className="flex items-center gap-1.5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative h-9 w-9 rounded-full"
                                >
                                    <Bell size={17} />
                                    <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-72 rounded-xl">
                                <div className="px-2 py-1.5 text-sm font-medium">
                                    Notifications
                                </div>
                                <DropdownMenuItem className="flex-col items-start gap-0.5 text-sm cursor-pointer">
                                    <span className="font-medium">New episode released</span>
                                    <span className="text-xs text-muted-foreground">
                                        A show on your watchlist just dropped a new episode
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex-col items-start gap-0.5 text-sm cursor-pointer">
                                    <span className="font-medium">Recommended for you</span>
                                    <span className="text-xs text-muted-foreground">
                                        Based on your recent watch history
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </div>
        </header>
    );
}