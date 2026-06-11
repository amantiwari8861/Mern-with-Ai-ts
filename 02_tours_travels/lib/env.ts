// Centralized, validated access to environment variables.
// Validation is *soft* at import time (warns, never throws) so that
// `next build` succeeds in CI without secrets. Code that actually needs a
// value calls the throwing getters below, failing loudly only at use time.
import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1).optional(),
  JWT_SECRET: z
    .string()
    .min(16, "JWT_SECRET must be at least 16 chars")
    .optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.warn(
    "⚠️  Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
}

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: (process.env.NODE_ENV ?? "development") as
    | "development"
    | "production"
    | "test",
  get isProd() {
    return this.NODE_ENV === "production";
  },
};

/** Returns MONGODB_URI or throws a clear error when it is missing. */
export function requireMongoUri(): string {
  if (!env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and fill it in."
    );
  }
  return env.MONGODB_URI;
}

/** Returns JWT_SECRET or throws a clear error when it is missing. */
export function requireJwtSecret(): string {
  if (!env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not set. Copy .env.example to .env.local and fill it in."
    );
  }
  return env.JWT_SECRET;
}
