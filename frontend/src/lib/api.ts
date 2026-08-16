export async function apiFetch(path: string, options: RequestInit = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        credentials: "include",
    });

    if (res.status === 401) {
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
        if (refreshRes.ok) {
            return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, { ...options, credentials: "include" });
        }
    }
    return res;
}