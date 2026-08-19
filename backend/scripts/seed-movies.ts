// scripts/seed-movies.ts
import "dotenv/config";
import { ingestPopularMovies, enqueueMoviesForEmbedding } from "../src/modules/discover/discoverService";

async function main() {
    const movies = await ingestPopularMovies();

    if (movies.length > 0) {
        console.log("Enqueueing for embedding...");
        await enqueueMoviesForEmbedding(movies);
    }

    console.log("Done.");
    process.exit(0);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});