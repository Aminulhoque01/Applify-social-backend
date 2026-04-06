import { Request, Response } from "express";
import * as LikeService from "./like.service";

export const toggleLike = async (req: any, res: Response) => {
  try {
    const { targetId, targetType } = req.body;

    const result = await LikeService.toggleLike(
      req.id,
      targetId,
      targetType
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


export const getLikes = async (req: Request, res: Response) => {
  try {
    const { targetId, targetType } = req.query;

    const result = await LikeService.getLikeInfo(
      targetId as string,
      targetType as "post" | "comment"
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