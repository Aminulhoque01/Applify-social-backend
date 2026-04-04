import { Request, Response } from "express";
import * as PostService from "./post.service";

// CREATE
export const createPost = async (req: any, res: Response) => {
  const result = await PostService.createPost(
    req.user.id,
    req.body,
    req.file
  );

  res.json({ success: true, data: result });
};

// GET
export const getFeed = async (req: any, res: Response) => {
  const result = await PostService.getFeed(
    req.user.id,
    req.query
  );

  res.json({
    success: true,
    ...result,
  });
};

export const getSingle = async (req: any, res: Response) => {
  const result = await PostService.getSingle(
    req.user.id,
    req.params.id // ✅ FIXED
  );

  res.json({
    success: true,
    data: result,
  });
};

// UPDATE
export const updatePost = async (req: any, res: Response) => {
  const result = await PostService.updatePost(
    req.params.id,
    req.user.id,
    req.body,
    req.file
  );

  res.json({ success: true, data: result });
};

// DELETE
export const deletePost = async (req: any, res: Response) => {
  const result = await PostService.deletePost(
    req.params.id,
    req.user.id
  );

  res.json({ success: true, data: result });
};