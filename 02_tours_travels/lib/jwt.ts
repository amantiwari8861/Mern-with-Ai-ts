// Edge-safe JWT helpers built on `jose` (no Node built-ins), so this module
// can be imported from middleware as well as route handlers.
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { requireJwtSecret } from "./env";

export const AUTH_COOKIE = "auth_token";
const ALG = "HS256";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = {
  sub: string; // user id
  email: string;
  name?: string;
  role: string;
};

function secretKey(): Uint8Array {
  return new TextEncoder().encode(requireJwtSecret());
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifyToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.sub !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return {
      sub: payload.sub,
      email: payload.email as string,
      name: payload.name as string | undefined,
      role: (payload.role as string) ?? "user",
    };
  } catch {
    return null;
  }
}

export function authCookieOptions(maxAge: number = MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
