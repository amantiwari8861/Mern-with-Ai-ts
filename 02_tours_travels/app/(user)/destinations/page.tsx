import type { Metadata } from "next";
import DestinationGrid from "@/components/DestinationGrid";
import { getActivePlaces } from "@/backend/services/places.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Browse all available tour destinations.",
};

const DestinationsPage = async () => {
  const places = await getActivePlaces();
  return <DestinationGrid places={places} />;
};

export default DestinationsPage;
