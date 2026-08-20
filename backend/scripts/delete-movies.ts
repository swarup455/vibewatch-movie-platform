// scripts/deleteMovies.ts
import prisma from "../src/lib/prisma.js";

async function main() {
    const result = await prisma.movie.deleteMany();

    console.log(`Deleted ${result.count} movies.`);
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });