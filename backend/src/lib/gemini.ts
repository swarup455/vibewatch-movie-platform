import axios from "axios";

const EMBED_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent";

export const embedText = async (text: string): Promise<number[]> => {
    try {
        const response = await axios.post(
            `${EMBED_URL}?key=${process.env.GEMINI_API_KEY}`,
            {
                content: {
                    parts: [{ text }],
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.embedding.values as number[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(
                "Gemini embedding error:",
                error.response?.status,
                error.response?.data
            );
        }

        throw new Error("Failed to generate embedding");
    }
};