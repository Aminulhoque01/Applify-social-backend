import { Like } from "./like.model";

export const toggleLike = async (
  userId: string,
  targetId: string,
  targetType: "post" | "comment"
) => {
  const existing = await Like.findOne({
    user: userId,
    targetId,
    targetType,
  });

  let liked = false;

  if (existing) {
    await existing.deleteOne();
    liked = false;
  } else {
    await Like.create({
      user: userId,
      targetId,
      targetType,
    });
    liked = true;
  }

  const totalLikes = await Like.countDocuments({
    targetId,
    targetType,
  });

  return {
    liked,
    totalLikes,
    targetId,
    targetType,
  };
};

// reusable helper
export const getLikeInfo = async (
  targetId: string,
  targetType: "post" | "comment",
  userId?: string
) => {
  const totalLikes = await Like.countDocuments({
    targetId,
    targetType,
  });

  let likedByMe = false;

  if (userId) {
    const existing = await Like.findOne({
      user: userId,
      targetId,
      targetType,
    });

    likedByMe = !!existing;
  }

  return {
    totalLikes,
    likedByMe,
  };
};