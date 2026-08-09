import { MovieCard } from "@/components/discover/MovieCard";
import { DiscoverHero } from "@/components/discover/DiscoverHero";
import { ProfileStrength } from "@/components/discover/ProfileStrength";
import { rows } from "@/lib/movie-data";

export default function DiscoverPage() {
    return (
        <main className="flex flex-col bg-transparent">
            <DiscoverHero />

            <div className="flex flex-col gap-10 py-10">
                {rows.map((row) => (
                    <MovieCard
                        key={row.title}
                        title={row.title}
                        movies={row.movies}
                    />
                ))}
            </div>

            <div className="pb-10">
                <ProfileStrength />
            </div>
        </main>
    );
}