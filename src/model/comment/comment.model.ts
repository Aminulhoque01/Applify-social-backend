import { Schema, model, Types } from "mongoose";

const commentSchema = new Schema(
  {
    text: { type: String, required: true },

    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
    },

    parentComment: {
      type: Types.ObjectId,
      ref: "Comment",
      default: null, 
    },
  },
  { timestamps: true }
);

export const Comment = model("Comment", commentSchema);