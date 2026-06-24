"use client";

/*
 * Client-side admin auth helpers. The real authentication lives server-side
 * (lib/adminAuth.ts + /api/admin/login|logout) using a signed, httpOnly
 * cookie the browser cannot read or forge. The localStorage entry here is
 * ONLY a display convenience (showing the signed-in name) — it is never the
 * security gate.
 */

const USER_STORAGE_KEY = "admin_user";

export type AdminUser = {
  email: string;
  name: string;
};

function canUseBrowserApis() {
  return typeof window !== "undefined";
}

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) return false;

    if (canUseBrowserApis()) {
      const user: AdminUser = { email: username, name: username.split("@")[0] || "Admin" };
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
    return true;
  } catch {
    return false;
  }
}

export async function logoutAdmin(): Promise<void> {
  try {
    await fetch("/api/admin/logout", { method: "POST" });
  } catch {
    // ignore — clearing local display state below is enough for the UI
  }
  if (canUseBrowserApis()) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }
}

export function getAdminUser(): AdminUser | null {
  if (!canUseBrowserApis()) {
    return null;
  }
  const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }
  try {
    return JSON.parse(rawUser) as AdminUser;
  } catch {
    return null;
  }
}

export function isAdminAuthenticated() {
  return Boolean(getAdminUser());
}
