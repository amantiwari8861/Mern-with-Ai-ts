import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { signInSchema } from "@/schemas/auth.schema";
import { findUserForAuth, toPublicUser } from "@/backend/services/user.service";
import { verifyPassword } from "@/lib/password";
import { AUTH_COOKIE, authCookieOptions, signToken } from "@/lib/jwt";
import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const parsed = signInSchema.safeParse(await request.json());
    if (!parsed.success) {
      return apiError("Invalid credentials", 400, parsed.error.flatten());
    }

    const user = await findUserForAuth(parsed.data.email);
    // Same generic message whether the email or password is wrong, so we don't
    // leak which emails are registered.
    if (!user) return apiError("Invalid email or password", 401);

    const ok = await verifyPassword(parsed.data.password, user.password);
    if (!ok) return apiError("Invalid email or password", 401);

    const publicUser = toPublicUser(user);
    const token = await signToken({
      sub: publicUser.id,
      email: publicUser.email,
      name: publicUser.name,
      role: publicUser.role,
    });

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token, authCookieOptions());

    return apiSuccess(publicUser, "Login successful");
  } catch (error) {
    return apiError("Unable to login", 500, getErrorMessage(error));
  }
}
