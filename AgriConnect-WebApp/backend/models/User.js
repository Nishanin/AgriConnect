import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Support multiple roles per user. We'll keep a convenience `role` field
    // on the returned payload in the API for compatibility (frontend sets it),
    // but in DB we store `roles` as an array.
    roles: {
      type: [String],
      required: true,
      enum: ["farmer", "buyer"],
      default: ["farmer", "buyer"],
    },
    location: { type: String, default: "Not specified" },
    phone: { type: String, default: "Not specified" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
