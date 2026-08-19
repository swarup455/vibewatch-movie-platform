# scripts/seed-movies.ts

Ingests popular movies from TMDB into the database and enqueues them for embedding.

## What it does

1. Checks how many movies currently exist in the DB.
2. If the count is already at or above the target (3000), it does nothing and exits.
3. Otherwise, it pages through TMDB's `/movie/popular` endpoint (most popular first), fetching each movie's full details, trailer, and keywords, and upserts it into the `Movie` table.
4. Waits a short delay between movies to stay well under TMDB's rate limits.
5. Stops automatically once the DB reaches the target count, or TMDB runs out of pages.
6. Pushes all newly saved/updated movies onto the embedding queue, prioritized by popularity (most popular embedded first).

Because it checks the current DB count before doing anything, it's safe to re-run any time — it acts as an automatic "top-up": if movies were removed and the count dropped below target, running the script again fetches more until the target is met again. Existing movies are upserted, not duplicated.

## Prerequisites

- `.env` must include:
  ```
  DATABASE_URL=...
  REDIS_URL=...
  TMDB_API_KEY=...
  GEMINI_API_KEY=...
  ```
- Postgres must be running with the `vector` extension enabled.
- Redis must be running (required by the embedding queue).

## Running it

```bash
npx tsx scripts/seed-movies.ts
```

The script exits on its own once ingestion is complete — it does not need to be kept running like the worker does.

## Notes

- Each movie costs 3 TMDB API calls (details, videos, keywords) plus the paginated popular-movies call — factor this in if you change the delay or target count.
- This script only saves movie data and enqueues embedding jobs — it does not perform embedding itself. The embedding worker (running separately, continuously) picks up the queued jobs and does the actual embedding.
- Currently run manually. A recurring daily version (via a BullMQ repeatable job) is planned so this runs automatically instead of by hand.