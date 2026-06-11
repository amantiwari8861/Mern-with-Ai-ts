import mongoose, { type InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    // Always stored as a bcrypt hash — never plaintext. `select: false` keeps
    // it out of query results so it can't accidentally reach a client.
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userImage: { type: String },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
};

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
