import { Like } from "./like.model";

// Toggle Like / Unlike
export const toggleLike = async (
  userId: string,
  targetId: string,
  targetType: "Post" | "Comment"
) => {
  const existing = await Like.findOne({
    user: userId,
    targetId,
    targetType,
  });

  if (existing) {
    await existing.deleteOne();
    return { liked: false };
  }

  await Like.create({
    user: userId,
    targetId,
    targetType,
  });

  return { liked: true };
};

// Get users who liked
export const getLikes = async (
  targetId: string,
  targetType: "Post" | "Comment"
) => {
  return await Like.find({ targetId, targetType })
    .populate("user", "firstName lastName");
};