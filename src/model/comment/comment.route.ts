import express from "express";
import {
  createComment,
  getComments,
} from "./comment.controller";
import { authMiddleware } from "../middleware/auth.middleware";
 

const commentRouter = express.Router();

commentRouter.post("/:postId", authMiddleware, createComment);
commentRouter.get("/:postId", authMiddleware, getComments);

export default commentRouter;