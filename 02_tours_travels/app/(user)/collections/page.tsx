import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import DestinationGrid from "@/components/DestinationGrid";
import { getActivePlaces } from "@/backend/services/places.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Signature Collections",
  description: "Our complete collection of curated tours and experiences.",
};

export default async function CollectionsPage() {
  const places = await getActivePlaces();
  return (
    <>
      <PageHeader
        eyebrow="Signature Collections"
        title="Curated Tours & Experiences"
        subtitle="Every journey we offer, gathered in one place."
      />
      <DestinationGrid places={places} />
    </>
  );
}
