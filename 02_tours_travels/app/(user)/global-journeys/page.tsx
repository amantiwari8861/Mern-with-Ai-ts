import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DestinationGrid from "@/components/DestinationGrid";
import { getPlacesByRegion } from "@/backend/services/places.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Global Journeys",
  description: "Explore handpicked destinations around the world.",
};

export default async function GlobalJourneysPage() {
  const places = await getPlacesByRegion(false);
  return (
    <>
      <PageHeader
        eyebrow="Global Journeys"
        title="Around the World"
        subtitle="Tropical beaches, modern skylines and everything between."
      />
      <DestinationGrid
        places={places}
        emptyHint="No international destinations loaded yet. Run `npm run seed` with a connected database."
      />
    </>
  );
}
