// Server-only session access for Server Components and Route Handlers.
// Reads the httpOnly auth cookie via next/headers and verifies the JWT.
import { cookies } from "next/headers";
import { AUTH_COOKIE, verifyToken, type SessionPayload } from "./jwt";

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}
