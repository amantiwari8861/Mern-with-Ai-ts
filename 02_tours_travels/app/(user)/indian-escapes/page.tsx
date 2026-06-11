import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DestinationGrid from "@/components/DestinationGrid";
import { getPlacesByRegion } from "@/backend/services/places.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Indian Escapes",
  description: "Discover the best destinations across India.",
};

export default async function IndianEscapesPage() {
  const places = await getPlacesByRegion(true);
  return (
    <>
      <PageHeader
        eyebrow="Indian Escapes"
        title="Journeys Across India"
        subtitle="From the Pink City to the golden deserts of Rajasthan."
      />
      <DestinationGrid
        places={places}
        emptyHint="No Indian destinations loaded yet. Run `npm run seed` with a connected database."
      />
    </>
  );
}
