import { getActivePlaces } from "@/backend/services/places.service";
import DestinationGrid from "@/components/DestinationGrid";

// Server Component — fetches via the resilient places service (returns an
// empty list instead of crashing when the DB is unreachable).
const Collections = async () => {
  const places = await getActivePlaces();
  return <DestinationGrid places={places} />;
};

export default Collections;
