import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ProfileStrength() {
    return (
        <section className="py-5">
            <div className="w-full">
                <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-md">
                    <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
                        <div>
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                                <Star
                                    size={14}
                                    className="fill-amber-400 text-amber-400"
                                />
                                Low Profile Strength
                            </p>

                            <p className="mt-1 text-xs text-zinc-400">
                                Rate more movies to sharpen your recommendations.
                            </p>

                            <div className="mt-3 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
                                <div className="h-full w-[30%] rounded-full bg-white" />
                            </div>

                            <p className="mt-1.5 text-[11px] text-zinc-500">
                                30% Complete
                            </p>
                        </div>

                        <Button className="rounded-full bg-white px-6 text-black hover:bg-zinc-200">
                            Keep Rating
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}