import axios from "axios";

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

clientApi.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/api/auth/refresh")
        ) {
            originalRequest._retry = true;

            try {
                await clientApi.post("/api/auth/refresh");

                return clientApi(originalRequest);
            } catch (refreshError) {
                console.error(
                    "Token refresh failed:",
                    refreshError
                );

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default clientApi;