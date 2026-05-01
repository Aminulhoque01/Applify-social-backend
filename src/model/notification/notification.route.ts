import { Router } from "express";
 
import {
  getNotificationsController,
  markAsReadController,
  deleteNotificationController,
} from "./notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { Notification } from "./notification.model";

const notificationRouter = Router();

notificationRouter.get(
  "/",
  authMiddleware,
  getNotificationsController
);

notificationRouter.patch(
  "/read/:id",
  authMiddleware,
  markAsReadController
);

notificationRouter.delete(
  "/:id",
  authMiddleware,
  deleteNotificationController
);


notificationRouter.get(
  "/count",
  authMiddleware,
  async (req, res) => {
    const userId = req.userId;

    const count = await Notification.countDocuments({
      receiver: userId,
      isRead: false,
    });

    res.json({ count });
  }
);


export default notificationRouter;