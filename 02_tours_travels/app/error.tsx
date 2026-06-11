"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook a real logger (Sentry, etc.) here in production.
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-(--primary)">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-gray-500">
        An unexpected error occurred while loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-xl bg-(--primary) px-6 py-3 font-semibold text-white transition hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
