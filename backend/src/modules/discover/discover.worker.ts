import { createMovieEmbedWorker } from "../../lib/queue.js";
import { embedText } from "../../lib/gemini.js";
import prisma from "../../lib/prisma.js";

createMovieEmbedWorker(async (movieId) => {
    const movie = await prisma.movie.findUniqueOrThrow({
        where: { id: movieId },
    });

    const text = `${movie.title}. ${movie.overview ?? ""
        }. Genres: ${movie.genres.join(", ")}`;

    const embedding = await embedText(text);

    await prisma.$executeRaw`
    UPDATE "Movie"
    SET embedding = ${embedding}::vector,
        "embeddedAt" = now()
    WHERE id = ${movieId}
  `;
});

console.log("Movie embedding worker started");