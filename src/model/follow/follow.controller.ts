import { Request, Response } from "express";
import { FollowService } from "./follow.service";
 

export const followUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.userId as string;
    const targetId = req.params.id;

    const result =
      await FollowService.followUserService(
        userId,
        targetId as string
      );

    res.status(201).json({
      success: true,
      message: "Followed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const unfollowUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.userId as string;
    const targetId = req.params.id;

    await FollowService.unfollowUserService(
      userId,
      targetId as string
    );

    res.status(200).json({
      success: true,
      message: "Unfollowed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFollowersController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id;

    const result =
      await FollowService.getFollowersService(
         userId as string
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

export const getFollowingController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.id;

    const result =
      await FollowService.getFollowingService(
        userId as string
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