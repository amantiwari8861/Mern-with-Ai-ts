/**
 * Seed the tours_travels database with the canonical places dataset.
 *
 *   npm run seed
 *
 * Reads MONGODB_URI from .env.local (auto-loaded below). Idempotent: upserts
 * each place by slug, so running it repeatedly won't create duplicates.
 *
 * Uses relative imports because `tsx` does not resolve tsconfig `@/` paths.
 */
import mongoose from "mongoose";
import PlacesDao from "../backend/model/places.model";
import { placesSeed } from "../backend/data/places.data";

// Auto-load .env.local when running under a recent Node (>= 20.12).
try {
  (process as unknown as { loadEnvFile?: (p: string) => void }).loadEnvFile?.(
    ".env.local"
  );
} catch {
  /* .env.local is optional; MONGODB_URI may already be in the environment */
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      "✖ MONGODB_URI is not set. Add it to .env.local (see .env.example)."
    );
    process.exit(1);
  }

  await mongoose.connect(uri, { dbName: "tours_travels" });
  console.log("✔ Connected to MongoDB");

  let upserts = 0;
  for (const place of placesSeed) {
    const res = await PlacesDao.updateOne(
      { slug: place.slug },
      { $set: place },
      { upsert: true }
    );
    if (res.upsertedCount || res.modifiedCount) upserts += 1;
  }

  console.log(`✔ Seeded ${placesSeed.length} places (${upserts} written)`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((error) => {
  console.error("✖ Seed failed:", error);
  process.exit(1);
});
