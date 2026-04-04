import express from "express";
import {
  createComment,
  getComments,
} from "./comment.controller";
import { authMiddleware } from "../middleware/auth.middleware";
 

const commentRouter = express.Router();

// create comment or reply
commentRouter.post("/", authMiddleware, createComment);

// get comments by post
commentRouter.get("/:postId", authMiddleware, getComments);

export default commentRouter;