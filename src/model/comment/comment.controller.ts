import { Request, Response } from "express";
import * as CommentService from "./comment.service";

// Create comment or reply
export const createComment = async (req: any, res: Response) => {
  const result = await CommentService.createComment(
    req.user.id,
    req.body
  );

  res.json({
    success: true,
    data: result,
  });
};

// Get all comments + replies for a post
export const getComments = async (req: Request, res: Response) => {
  const { postId } = req.params;

  const result = await CommentService.getPostComments(postId as string);

  res.json({
    success: true,
    data: result,
  });
};