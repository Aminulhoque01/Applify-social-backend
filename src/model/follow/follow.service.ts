 
import { getIO, onlineUsers } from "../../socket/socket";
import { Notification } from "../notification/notification.model";
import { NotificationService } from "../notification/notification.service";
import { Follow } from "./follow.model";

const io = getIO();

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

  // 🔔 save notification
  const notification =
    await NotificationService.createNotificationService(
      userId,
      targetId,
      "follow",
      "started following you"
    );

  // 📩 realtime send
  const receiverSocketId = onlineUsers.get(targetId);
  const io = getIO();

  if (receiverSocketId) {
    io.to(receiverSocketId).emit(
      "new-notification",
      notification
    );

    const count = await Notification.countDocuments({
      receiver: targetId,
      isRead: false,
    });

    io.to(receiverSocketId).emit(
      "notification-count",
      count
    );
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

