import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // Middleware already guards this route; this is defence in depth.
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/dashboard");

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-(--primary)">
        Welcome back, {session.name || session.email}
      </h1>
      <p className="mt-2 text-gray-500">
        Here&apos;s an overview of your travel account.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "Account", value: session.email },
          { label: "Role", value: session.role },
          { label: "Member status", value: "Active" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <p className="text-sm uppercase tracking-wide text-gray-400">
              {card.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/destinations"
          className="rounded-xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Browse Destinations
        </Link>
        <Link
          href="/settings"
          className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Account Settings
        </Link>
      </div>
    </div>
  );
}
