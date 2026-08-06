import { Button } from "@/components/ui/button";

const CHIPS = [
    "I had a breakup 💔",
    "Mind-bending movies",
    "Anime with amazing storytelling",
    "Something before sleeping",
    "Movies like Interstellar",
    "Weekend marathon picks",
    "Dark psychological thrillers",
];

export default function SuggestionChips({ onSelect }: { onSelect: (v: string) => void }) {
    return (
        <div className="flex flex-wrap gap-2 justify-center mt-6">
            {CHIPS.map((chip) => (
                <Button
                    key={chip}
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs text-muted-foreground hover:text-foreground h-7 px-3"
                    onClick={() => onSelect(chip)}
                >
                    {chip}
                </Button>
            ))}
        </div>
    );
}