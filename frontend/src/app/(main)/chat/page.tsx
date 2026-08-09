"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, History, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ChatHistory from "@/components/chat/ChatHistory";
import SuggestionChips from "@/components/chat/SuggestionChips";

export default function ChatPage() {
    const router = useRouter();
    const [input, setInput] = useState("");
    const [historyOpen, setHistoryOpen] = useState(false);

    function handleSubmit() {
        if (!input.trim()) return;
        const chatId = crypto.randomUUID().slice(0, 8);
        sessionStorage.setItem(`chat_init_${chatId}`, input.trim());
        router.push(`/chat/${chatId}`);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    }

    return (
        <main className="flex px-4 pt-6">
            <div className="w-full max-w-6xl relative">
                <div className="flex items-start justify-center">
                    <div className="flex flex-col items-center text-center mb-10">
                        <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">
                            What should we watch today?
                        </h1>
                        <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                            Describe your mood, favorite genres, actors, or what you're feeling right now and get personalized recommendations.
                        </p>
                    </div>
                    <div className="absolute top-0 right-0 flex items-center justify-end gap-2 mb-16">
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 rounded-lg text-muted-foreground"
                            onClick={() => setHistoryOpen(true)}
                        >
                            <History size={14} /> History
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 rounded-lg text-muted-foreground"
                            onClick={() => setInput("")}
                        >
                            <Plus size={14} /> New Chat
                        </Button>
                    </div>
                </div>

                {/* Search box */}
                <div className="relative rounded-2xl max-w-3xl mx-auto border border-border bg-background/60 backdrop-blur-sm shadow-sm p-2.5">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="e.g. Mind-bending sci-fi, something relaxing before sleep, anime like Attack on Titan..."
                        className="min-h-[56px] resize-none border-0 !bg-transparent dark:!bg-transparent shadow-none p-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <div className="flex justify-end mt-1">
                        <Button
                            size="icon"
                            className="h-7 w-7 rounded-lg"
                            onClick={handleSubmit}
                            disabled={!input.trim()}
                        >
                            <Send size={13} />
                        </Button>
                    </div>
                </div>

                {/* Suggestion chips */}
                <SuggestionChips onSelect={setInput} />

                <ChatHistory open={historyOpen} onOpenChange={setHistoryOpen} />
            </div>
        </main>
    );
}