import { apiFetch } from "@/lib/api";

export async function logoutUser() {
  const res = await apiFetch("/api/auth/logout", { method: "POST" });
  return res.ok;
}

export async function getMe() {
  const res = await apiFetch("/api/auth/me");
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}