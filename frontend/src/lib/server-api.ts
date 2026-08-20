import axios from "axios";
import { cookies } from "next/headers";

const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

serverApi.interceptors.request.use(async (config) => {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    if (cookieHeader) {
        config.headers.Cookie = cookieHeader;
    }

    return config;
});

export default serverApi;