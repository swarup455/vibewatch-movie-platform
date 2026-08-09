"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Clapperboard,
    MessageSquare,
    Compass,
    Library,
    User,
    Settings,
    LogOut,
} from "lucide-react";

const items = [
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "Discover", url: "/discover", icon: Compass },
    { title: "Collections", url: "/collections", icon: Library },
];

const footerItems = [
    { title: "Profile", icon: User },
    { title: "Settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="overflow-hidden">
            {/* HEADER — Brand */}
            <SidebarHeader className="px-4 py-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10">
                        <Clapperboard size={16} className="text-foreground" />
                    </div>
                    <span className="text-base font-semibold tracking-tight text-foreground">
                        VibeWatch
                    </span>
                </div>
            </SidebarHeader>

            <SidebarSeparator className="mx-4 w-auto" />

            {/* NAV */}
            <SidebarContent className="px-2 py-3">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`h-9 rounded-lg px-3 text-sm text-muted-foreground hover:text-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium ${isActive ? "border-r-2 border-foreground/60" : "border-r-2 border-transparent"
                                                }`}
                                        >
                                            <Link href={item.url}>
                                                <item.icon size={16} />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="px-2 pb-4 pt-2">
                <SidebarSeparator className="mx-2 mb-3 w-auto" />
                {/* User row */}
                <div className="flex items-center gap-2.5 px-2 pb-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs font-medium">
                            SD
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col leading-tight">
                        <span className="text-sm font-medium text-foreground">
                            Swarup
                        </span>
                        <span className="text-xs text-muted-foreground">
                            Free plan
                        </span>
                    </div>
                </div>

                <SidebarMenu className="gap-1">
                    {footerItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton className="h-9 rounded-lg px-3 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
                                <item.icon size={16} />
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="h-9 rounded-lg px-3 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive">
                            <LogOut size={16} />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}