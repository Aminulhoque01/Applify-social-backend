import { Request, Response } from "express";
import * as CommentService from "./comment.service";

// Create comment or reply
export const createComment = async (req: any, res: Response) => {
  const result = await CommentService.createComment(
    req.id,
    req.params.postId, // get postId from URL
    req.body
  );

  res.json({
    success: true,
    data: result,
  });
};

// Get all comments + replies for a post
export const getComments = async (req: any, res: Response) => {
  const result = await CommentService.getPostComments(
    req.params.postId,
    req.id
  );

  res.json({
    success: true,
    data: result,
  });
};