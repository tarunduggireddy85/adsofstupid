"use client";

const AUTH_COOKIE = "admin_auth";
const USER_STORAGE_KEY = "admin_user";

export const DUMMY_ADMIN = {
  email: "admin@example.com",
  password: "admin123",
  name: "Admin User"
};

export type AdminUser = {
  email: string;
  name: string;
};

function canUseBrowserApis() {
  return typeof window !== "undefined";
}

export function loginAdmin(email: string, password: string) {
  const isValid =
    email === DUMMY_ADMIN.email && password === DUMMY_ADMIN.password;

  if (!isValid || !canUseBrowserApis()) {
    return false;
  }

  const user: AdminUser = {
    email: DUMMY_ADMIN.email,
    name: DUMMY_ADMIN.name
  };

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  document.cookie = `${AUTH_COOKIE}=true; path=/; max-age=604800; samesite=lax`;

  return true;
}

export function logoutAdmin() {
  if (!canUseBrowserApis()) {
    return;
  }

  window.localStorage.removeItem(USER_STORAGE_KEY);
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function getAdminUser() {
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
