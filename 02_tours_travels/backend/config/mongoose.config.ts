import mongoose from "mongoose";
import { requireMongoUri } from "@/lib/env";

// Cache the connection across hot-reloads / serverless invocations so we don't
// open a new pool on every request.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // requireMongoUri throws a clear error only when we actually connect,
    // so importing this module never crashes a build that lacks env vars.
    const uri = requireMongoUri();
    cached.promise = mongoose.connect(uri, {
      dbName: "tours_travels",
      // Fail fast instead of hanging a request when the DB is unreachable.
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset so the next call retries instead of reusing a rejected promise.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
