import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" , required: true,},
    text: String,
    image: String,
    isPrivate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Post = model("Post", postSchema);