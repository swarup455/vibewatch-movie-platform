// api/auth.ts

import serverApi from "@/lib/server-api";

export async function logoutUser() {
  try {
    await serverApi.post("/api/auth/logout");
    return true;
  } catch (error) {
    console.error("Logout failed:", error);
    return false;
  }
}

export async function getMe() {
  try {
    const response = await serverApi.get("/api/auth/me");

    return response.data.user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}