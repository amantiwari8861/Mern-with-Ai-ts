import { NextRequest } from "next/server";
import { signUpSchema } from "@/schemas/auth.schema";
import { createUser, EmailTakenError } from "@/backend/services/user.service";
import { apiError, apiSuccess, getErrorMessage } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Server-side validation — never trust the client. Strips unknown fields
    // (e.g. an attacker-supplied `role`), preventing mass assignment.
    const parsed = signUpSchema.safeParse(await request.json());
    if (!parsed.success) {
      return apiError("Validation failed", 400, parsed.error.flatten());
    }

    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    return apiSuccess(user, "User registered successfully!", 201);
  } catch (error) {
    if (error instanceof EmailTakenError) {
      return apiError(error.message, 409);
    }
    return apiError("Unable to register user!", 500, getErrorMessage(error));
  }
}
