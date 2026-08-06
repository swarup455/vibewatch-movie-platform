import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Recommendation } from "@/app/chat/[chatId]/page";

export default function RecommendationCard({ rec }: { rec: Recommendation }) {
    return (
        <Card className="rounded-2xl border-border bg-background/60 backdrop-blur-sm shadow-sm">
            <CardContent className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground leading-tight">{rec.title}</h3>
                    <div className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground">
                        <Star size={11} className="fill-foreground text-foreground" />
                        {rec.rating}
                    </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-muted-foreground">{rec.year}</span>
                    {rec.genre.split(",").map((g) => (
                        <Badge key={g} variant="secondary" className="text-xs rounded-md px-1.5 py-0">
                            {g.trim()}
                        </Badge>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{rec.why}</p>

                <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Mood: </span>{rec.mood}
                </div>

                {rec.similar.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Similar: </span>
                        {rec.similar.join(", ")}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}