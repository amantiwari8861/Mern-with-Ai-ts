import type { TouristPlace } from "@/types/allTypes";
import DestinationCard from "@/components/DestinationCard";

export default function DestinationGrid({
  places,
  emptyHint,
}: {
  places: TouristPlace[];
  emptyHint?: string;
}) {
  if (!places.length) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-lg font-semibold text-(--tertiary)">
          No destinations to show yet.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {emptyHint ??
            "Connect MongoDB (MONGODB_URI in .env.local) and run `npm run seed` to load sample destinations."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {places.map((place) => (
        <DestinationCard key={place._id} place={place} />
      ))}
    </div>
  );
}
