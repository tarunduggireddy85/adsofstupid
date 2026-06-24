import crypto from "crypto";
import { cookies } from "next/headers";

/*
 * Real admin auth: an HMAC-signed, httpOnly session cookie.
 *
 * Replaces the old forgeable `admin_auth=true` cookie. The cookie now holds a
 * signed token (`admin.<expiry>.<hmac>`) that the browser cannot forge or even
 * read (httpOnly). Credentials and the signing secret live in env vars only.
 *
 * Required env (see .env.example):
 *   ADMIN_USERNAME, ADMIN_PASSWORD  — the login credentials
 *   ADMIN_SESSION_SECRET            — long random string used to sign sessions
 */

export const ADMIN_COOKIE = "admin_session";
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

function getSecret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Validate login credentials against env (constant-time). */
export function verifyCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // Evaluate both to avoid short-circuit timing leaks.
  const uOk = safeEqual(username, u);
  const pOk = safeEqual(password, p);
  return uOk && pOk;
}

/** Create a signed session token valid for ADMIN_MAX_AGE. */
export function createSessionToken(): string {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const exp = Date.now() + ADMIN_MAX_AGE * 1000;
  const payload = `admin.${exp}`;
  return `${payload}.${sign(payload, secret)}`;
}

/** Verify a session token: signature valid + not expired. */
export function verifySessionToken(token: string | undefined): boolean {
  const secret = getSecret();
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [role, expStr, sig] = parts;
  const expected = sign(`${role}.${expStr}`, secret);
  if (!safeEqual(sig, expected)) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return role === "admin";
}

/** Read the request cookie and return whether the caller is an authed admin. */
export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}
