import { getSession } from "@/lib/session";
import { apiError, apiSuccess } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  if (!session) return apiError("Not authenticated", 401);

  return apiSuccess(
    {
      id: session.sub,
      name: session.name ?? "",
      email: session.email,
      role: session.role,
    },
    "OK"
  );
}
