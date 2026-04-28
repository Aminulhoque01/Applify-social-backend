import { Notification } from "./notification.model";

const createNotificationService = async (
  sender: string,
  receiver: string,
  type: string,
  message: string
) => {
  return await Notification.create({
    sender,
    receiver,
    type,
    message,
  });
};

const getNotificationsService = async (
  userId: string
) => {
  return await Notification.find({
    receiver: userId,
  })
    .populate(
      "sender",
      "firstName lastName username profileImage"
    )
    .sort({ createdAt: -1 });
};

const markAsReadService = async (
  notificationId: string
) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

const deleteNotificationService = async (
  notificationId: string
) => {
  return await Notification.findByIdAndDelete(
    notificationId
  );
};

export const NotificationService = {
  createNotificationService,
  getNotificationsService,
  markAsReadService,
  deleteNotificationService,
};