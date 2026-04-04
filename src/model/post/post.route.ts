import express from "express";
import * as PostController from "./post.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload";
 

const postRouter = express.Router();

postRouter.post(
  "/",
  authMiddleware,
  upload.single("image"),
  PostController.createPost
);

postRouter.get("/", authMiddleware, PostController.getFeed);
postRouter.get("/:id", authMiddleware, PostController.getSingle);

postRouter.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  PostController.updatePost
);

postRouter.delete("/:id", authMiddleware, PostController.deletePost);

export default postRouter;