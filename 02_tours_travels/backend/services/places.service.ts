import { connectDB } from "@/backend/config/mongoose.config";
import PlacesDao from "@/backend/model/places.model";
import type { TouristPlace } from "@/types/allTypes";

// Convert Mongoose lean docs (ObjectId, Date) into plain, JSON-serializable
// objects that are safe to pass from Server to Client Components.
function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Run a read against MongoDB, returning `fallback` (and logging a warning)
 * if the DB is unreachable or unconfigured. This keeps `next build` and the
 * dev server resilient when no database is wired up yet.
 */
async function safeRead<T>(
  run: () => Promise<T>,
  fallback: T,
  label: string
): Promise<T> {
  try {
    await connectDB();
    return await run();
  } catch (error) {
    console.warn(
      `[places.service] ${label} failed:`,
      error instanceof Error ? error.message : error
    );
    return fallback;
  }
}

export function getActivePlaces(): Promise<TouristPlace[]> {
  return safeRead<TouristPlace[]>(
    async () =>
      serialize(await PlacesDao.find({ isActive: true }).lean()) as unknown as TouristPlace[],
    [],
    "getActivePlaces"
  );
}

export function getPlaceBySlug(slug: string): Promise<TouristPlace | null> {
  return safeRead<TouristPlace | null>(
    async () =>
      serialize(
        await PlacesDao.findOne({ slug, isActive: true }).lean()
      ) as unknown as TouristPlace | null,
    null,
    "getPlaceBySlug"
  );
}

/** India-only when `india` is true, everything else when false. */
export function getPlacesByRegion(india: boolean): Promise<TouristPlace[]> {
  const filter = india ? { country: "India" } : { country: { $ne: "India" } };
  return safeRead<TouristPlace[]>(
    async () =>
      serialize(
        await PlacesDao.find({ isActive: true, ...filter }).lean()
      ) as unknown as TouristPlace[],
    [],
    "getPlacesByRegion"
  );
}

export function getActiveSlugs(): Promise<string[]> {
  return safeRead<string[]>(
    async () => {
      const docs = await PlacesDao.find(
        { isActive: true },
        { slug: 1, _id: 0 }
      ).lean<{ slug: string }[]>();
      return docs.map((d) => d.slug);
    },
    [],
    "getActiveSlugs"
  );
}
