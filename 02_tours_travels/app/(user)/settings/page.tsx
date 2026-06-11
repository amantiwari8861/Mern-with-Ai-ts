import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Account Settings" };

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/settings");

  const fields = [
    { label: "Name", value: session.name || "—" },
    { label: "Email", value: session.email },
    { label: "Role", value: session.role },
  ];

  return (
    <div className="container mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-3xl font-bold text-(--primary)">Account Settings</h1>
      <p className="mt-2 text-gray-500">Your profile information.</p>

      <div className="mt-8 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between px-6 py-4"
          >
            <span className="text-sm font-medium text-gray-500">
              {field.label}
            </span>
            <span className="font-semibold text-gray-800">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
