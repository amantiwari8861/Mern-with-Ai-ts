// Consistent JSON envelope + safe error handling for Route Handlers.
import { NextResponse } from "next/server";
import { env } from "./env";

export type ApiEnvelope<T = unknown> = {
  status: boolean;
  message: string;
  data?: T;
  details?: unknown;
};

export function apiSuccess<T>(data: T, message = "OK", status = 200) {
  return NextResponse.json<ApiEnvelope<T>>(
    { status: true, message, data },
    { status }
  );
}

export function apiError(message: string, status = 500, details?: unknown) {
  const body: ApiEnvelope = { status: false, message };
  // Never leak internals (stack traces, driver errors) to clients in prod.
  if (details !== undefined && !env.isProd) body.details = details;
  return NextResponse.json(body, { status });
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected error";
}
