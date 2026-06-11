import { connectDB } from "@/backend/config/mongoose.config";
import UserModel from "@/backend/model/user.model";
import { hashPassword } from "@/lib/password";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  userImage?: string;
};

export class EmailTakenError extends Error {
  constructor() {
    super("Email is already registered");
    this.name = "EmailTakenError";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toPublicUser(doc: any): PublicUser {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    role: doc.role ?? "user",
    userImage: doc.userImage ?? undefined,
  };
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<PublicUser> {
  await connectDB();

  const email = input.email.toLowerCase().trim();
  const existing = await UserModel.findOne({ email }).lean();
  if (existing) throw new EmailTakenError();

  const passwordHash = await hashPassword(input.password);
  const doc = await UserModel.create({
    name: input.name.trim(),
    email,
    password: passwordHash,
    role: "user", // never trust a client-supplied role (no mass-assignment)
  });

  return toPublicUser(doc);
}

/** Returns the user document WITH the password hash, for login verification. */
export async function findUserForAuth(email: string) {
  await connectDB();
  return UserModel.findOne({ email: email.toLowerCase().trim() })
    .select("+password")
    .lean<{
      _id: unknown;
      name: string;
      email: string;
      password: string;
      role: string;
      userImage?: string;
    }>();
}
