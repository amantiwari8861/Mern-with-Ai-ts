export default function Loading() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-(--secondary) border-t-transparent"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
