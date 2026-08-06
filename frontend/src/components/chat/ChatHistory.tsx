"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, MessageSquare } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type HistoryItem = { id: string; title: string; timestamp: number };

export default function ChatHistory({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
}) {
    const router = useRouter();
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        if (open) {
            const stored = JSON.parse(localStorage.getItem("vw_history") ?? "[]");
            setHistory(stored);
        }
    }, [open]);

    function deleteChat(id: string) {
        const updated = history.filter((h) => h.id !== id);
        setHistory(updated);
        localStorage.setItem("vw_history", JSON.stringify(updated));
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="px-4 pt-5 pb-3 border-b border-border">
                    <SheetTitle className="text-sm font-medium">Chat History</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-full px-2 py-3">
                    {history.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center mt-8">No history yet.</p>
                    ) : (
                        <div className="flex flex-col gap-1">
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-muted cursor-pointer transition-colors"
                                    onClick={() => { router.push(`/chat/${item.id}`); onOpenChange(false); }}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <MessageSquare size={13} className="text-muted-foreground shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-foreground truncate">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(item.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                        onClick={(e) => { e.stopPropagation(); deleteChat(item.id); }}
                                    >
                                        <Trash2 size={12} className="text-muted-foreground" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}