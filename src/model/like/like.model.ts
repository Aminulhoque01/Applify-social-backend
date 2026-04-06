import { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ["post", "comment"],
      required: true,
    },
  },
  { timestamps: true }
);

// same user can't like same target twice
likeSchema.index(
  { user: 1, targetId: 1, targetType: 1 },
  { unique: true }
);

export const Like = model("Like", likeSchema);