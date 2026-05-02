import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    members: [
      { type: Schema.Types.ObjectId, ref: "User" }
    ],
  },
  { timestamps: true }
);

export const Conversation = model(
  "Conversation",
  conversationSchema
);