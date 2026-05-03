 
import { getIO, onlineUsers } from "../../socket/socket";
 
import { Follow } from "./follow.model";

 

const followUserService = async (
  userId: string,
  targetId: string
) => {

  const result = await Follow.create({
    follower: userId,
    following: targetId,
  });

  const receiverSocketId = onlineUsers.get(targetId);

  if (receiverSocketId) {
    const io = getIO(); // ✅ CORRECT PLACE

    io.to(receiverSocketId).emit("new-notification", {
      message: "started following you",
    });
  }

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

