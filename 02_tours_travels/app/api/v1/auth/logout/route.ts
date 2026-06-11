import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/jwt";
import { apiSuccess } from "@/lib/api";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return apiSuccess(null, "Logged out");
}
