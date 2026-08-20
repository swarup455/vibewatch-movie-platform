"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import clientApi from "@/lib/client-api";

type User = {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
};

type UserContextType = {
    user: User | null;
    loading: boolean;
    refetchUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await clientApi.get("/api/auth/me");

            setUser(response.data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                refetchUser: fetchUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error(
            "useUser must be used inside UserProvider"
        );
    }

    return ctx;
};