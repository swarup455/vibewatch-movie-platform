"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Send, History, Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ChatHistory from "@/components/chat/ChatHistory";
import RecommendationCard from "@/components/chat/RecommendationCard";

export type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    recommendations?: Recommendation[];
};

export type Recommendation = {
    title: string;
    year: string;
    rating: string;
    genre: string;
    why: string;
    mood: string;
    similar: string[];
};

const SYSTEM_PROMPT = `You are VibeWatch AI — an expert entertainment assistant.
You ONLY discuss: movies, TV series, anime, documentaries, genres, actors, directors, streaming platforms, and content recommendations.
If asked anything unrelated (math, coding, politics, history, science, geography, etc.), respond:
"I'm focused on helping you discover movies, series, anime, and documentaries. Tell me your mood or what you've enjoyed recently, and I'll recommend something great to watch."

When recommending content, ALWAYS respond with valid JSON in this exact format:
{
  "message": "Your conversational response here",
  "recommendations": [
    {
      "title": "Movie Title",
      "year": "2023",
      "rating": "8.5",
      "genre": "Sci-Fi, Drama",
      "why": "Why this matches their request",
      "mood": "Inspirational, immersive",
      "similar": ["Title 1", "Title 2", "Title 3"]
    }
  ]
}

If no recommendations are needed (e.g. a follow-up question), respond with:
{
  "message": "Your response here",
  "recommendations": []
}`;

export default function ChatRoomPage() {
    const { chatId } = useParams<{ chatId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [historyOpen, setHistoryOpen] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Send the initial message from landing page
    useEffect(() => {
        const init = sessionStorage.getItem(`chat_init_${chatId}`);
        if (init) {
            sessionStorage.removeItem(`chat_init_${chatId}`);
            sendMessage(init);
        }
    }, [chatId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function sendMessage(text: string) {
        if (!text.trim() || loading) return;

        const userMsg: Message = {
            id: crypto.randomUUID(),
            role: "user",
            content: text.trim(),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "claude-sonnet-4-6",
                    max_tokens: 1000,
                    system: SYSTEM_PROMPT,
                    messages: updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await res.json();
            const raw = data.content?.[0]?.text ?? "";

            let parsed: { message: string; recommendations: Recommendation[] } = {
                message: raw,
                recommendations: [],
            };

            try {
                const jsonMatch = raw.match(/\{[\s\S]*\}/);
                if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
            } catch { }

            const assistantMsg: Message = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: parsed.message,
                recommendations: parsed.recommendations,
            };

            setMessages((prev) => [...prev, assistantMsg]);

            // Persist to localStorage for history
            const history = JSON.parse(localStorage.getItem("vw_history") ?? "[]");
            const exists = history.find((h: { id: string }) => h.id === chatId);
            if (!exists) {
                history.unshift({ id: chatId, title: text.trim().slice(0, 50), timestamp: Date.now() });
                localStorage.setItem("vw_history", JSON.stringify(history.slice(0, 30)));
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    }

    return (
        <main className="flex justify-center px-4 pt-6">
            <div className="w-full max-w-6xl flex flex-col" style={{ height: "calc(100dvh - 80px)" }}>

                {/* Top bar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
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
                            onClick={() => window.location.href = "/chat"}
                        >
                            <Plus size={14} /> New Chat
                        </Button>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                        Chat · {chatId}
                    </span>
                </div>

                <Separator className="mb-4" />

                {/* Messages */}
                <ScrollArea className="flex-1 pr-2">
                    <div className="flex flex-col gap-6 pb-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "assistant" && (
                                    <Avatar className="h-7 w-7 mt-1 shrink-0">
                                        <AvatarFallback className="text-xs"><Bot size={13} /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`flex flex-col gap-3 max-w-2xl ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-foreground text-background"
                                            : "bg-muted text-foreground"
                                        }`}>
                                        {msg.content}
                                    </div>
                                    {msg.recommendations && msg.recommendations.length > 0 && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                                            {msg.recommendations.map((rec, i) => (
                                                <RecommendationCard key={i} rec={rec} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {msg.role === "user" && (
                                    <Avatar className="h-7 w-7 mt-1 shrink-0">
                                        <AvatarFallback className="text-xs">SD</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-3 justify-start">
                                <Avatar className="h-7 w-7 mt-1 shrink-0">
                                    <AvatarFallback className="text-xs"><Bot size={13} /></AvatarFallback>
                                </Avatar>
                                <div className="rounded-2xl px-4 py-3 bg-muted text-muted-foreground text-sm flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                </ScrollArea>

                {/* Sticky input */}
                <div className="mt-4 rounded-2xl border border-border bg-background/60 backdrop-blur-sm shadow-sm p-3">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask for a recommendation..."
                        className="min-h-[60px] max-h-[140px] resize-none border-0 bg-transparent p-0 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <div className="flex justify-end mt-2">
                        <Button
                            size="sm"
                            className="gap-2 rounded-lg"
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || loading}
                        >
                            <Send size={13} /> Send
                        </Button>
                    </div>
                </div>

            </div>
            <ChatHistory open={historyOpen} onOpenChange={setHistoryOpen} />
        </main>
    );
}