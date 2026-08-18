import { Queue, QueueEvents, Worker } from "bullmq";
import { Redis } from "ioredis";

export const connection = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
});

export const movieEmbedQueue = new Queue("movie-embed", {
    connection,
});

export function createMovieEmbedWorker(
    processor: (movieId: string) => Promise<void>
) {
    return new Worker(
        "movie-embed",
        async (job) => {
            await processor(job.data.movieId);
        },
        {
            connection,
            limiter: {
                max: 500,
                duration: 24 * 60 * 60 * 1000,
            },
            concurrency: 1,
        }
    );
}

export const movieEmbedQueueEvents = new QueueEvents("movie-embed", { connection });