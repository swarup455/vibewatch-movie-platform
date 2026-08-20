import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMovies } from "@/api/discover";
import { ContentCard } from "@/components/discover/ContentCard";

type SectionPageProps = {
    params: Promise<{
        section: string;
    }>;
};

export default async function SectionPage({
    params,
}: SectionPageProps) {
    const { section } = await params;

    const movies = await getMovies();

    const title = decodeURIComponent(section);

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <Link
                        href="/discover"
                        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft size={16} />
                        Back to Discover
                    </Link>

                    <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {title.replace(/-/g, " ")}
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Movies selected for you.
                    </p>
                </div>

                <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => (
                        <ContentCard
                            key={movie.id}
                            movie={movie}
                            variant="portrait"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}