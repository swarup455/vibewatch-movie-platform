export default function Loading() {
    return (
        <main className="flex flex-col bg-transparent">
            <div className="h-125 animate-pulse rounded-xl bg-white/5" />

            <div className="flex flex-col gap-10 py-10">
                <div className="h-8 w-48 animate-pulse rounded bg-white/5" />

                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-72 animate-pulse rounded-xl bg-white/5"
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}