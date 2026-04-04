import { Request, Response } from "express";
import * as LikeService from "./like.service";

export const toggleLike = async (req: any, res: Response) => {
  const { targetId, targetType } = req.body;

  const result = await LikeService.toggleLike(
    req.user.id,
    targetId,
    targetType
  );

  res.json({
    success: true,
    data: result,
  });
};

export const getLikes = async (req: Request, res: Response) => {
  const { targetId, targetType } = req.query;

  const result = await LikeService.getLikes(
    targetId as string,
    targetType as "Post" | "Comment"
  );

  res.json({
    success: true,
    data: result,
  });
};