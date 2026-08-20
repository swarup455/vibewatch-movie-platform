import { ContentSection } from "@/components/discover/ContentSection";
import { DiscoverHero } from "@/components/discover/DiscoverHero";
import { ProfileStrength } from "@/components/discover/ProfileStrength";
import { getMovies } from "@/api/discover";

export default async function DiscoverPage() {
    const movies = await getMovies();
    const featuredMovie = movies[0];

    return (
        <main className="flex flex-col bg-transparent">
            {featuredMovie && (
                <DiscoverHero movie={featuredMovie} />
            )}

            <div className="flex flex-col gap-10 py-10">
                <ContentSection
                    title="Top Recommendation"
                    movies={movies}
                    path="/discover/Top-Recommendations"
                />
            </div>

            <div className="pb-10">
                <ProfileStrength />
            </div>
        </main>
    );
}