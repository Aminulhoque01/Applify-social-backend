import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

export const getNotificationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.userId as string;

    const result =
      await NotificationService.getNotificationsService(
        userId
      );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAsReadController = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await NotificationService.markAsReadService(
        req.params.id as string
      );

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNotificationController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await NotificationService.deleteNotificationService(
        req.params.id as string
      );

      res.status(200).json({
        success: true,
        message: "Notification deleted",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };