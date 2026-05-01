import { Router } from "express"; 
 
import { authMiddleware } from "../middleware/auth.middleware";
import { deleteNotificationController, getNotificationsController, markAsReadController } from "../notification/notification.controller";

const notificationRouter = Router();

// 🔔 Get all notifications
notificationRouter.get(
  "/",
  authMiddleware,
  getNotificationsController
);

// ✅ Mark single notification as read
notificationRouter.patch(
  "/read/:id",
  authMiddleware,
  markAsReadController
);

// 🗑️ Delete notification
notificationRouter.delete(
  "/:id",
  authMiddleware,
  deleteNotificationController
);

export default notificationRouter;