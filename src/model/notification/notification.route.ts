import { Router } from "express";
 
import {
  getNotificationsController,
  markAsReadController,
  deleteNotificationController,
} from "./notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";

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

export default notificationRouter;