import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    username: { type: String, unique: true, required: true },  
    email: { type: String, unique: true, required: true, lowercase: true },

    password: { type: String, required: true },

    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },

    bio: { type: String, default: "" },

    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],

    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date }
  },
  { timestamps: true }
);

export const User = model("User", userSchema);