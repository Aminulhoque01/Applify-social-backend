import { Follow } from "./follow.model";

 const followUserService = async (
  userId: string,
  targetId: string
) => {
  if (userId === targetId) {
    throw new Error("You cannot follow yourself");
  }

  const alreadyFollowed = await Follow.findOne({
    follower: userId,
    following: targetId,
  });

  if (alreadyFollowed) {
    throw new Error("Already followed");
  }

  const result = await Follow.create({
    follower: userId,
    following: targetId,
  });

  return result;
};

const unfollowUserService = async (
  userId: string,
  targetId: string
) => {
  const result = await Follow.findOneAndDelete({
    follower: userId,
    following: targetId,
  });

  return result;
};

 const getFollowersService = async (userId: string) => {
  return await Follow.find({ following: userId })
    .populate(
      "follower",
      "firstName lastName username profileImage"
    )
    .sort({ createdAt: -1 });
};

const getFollowingService = async (userId: string) => {
  return await Follow.find({ follower: userId })
    .populate(
      "following",
      "firstName lastName username profileImage"
    )
    .sort({ createdAt: -1 });
};

export const FollowService={
 followUserService,
 unfollowUserService,
 getFollowersService,
 getFollowingService
}