import { Router } from "express";
import {
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingController,
} from "./follow.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const followersRouter = Router();

followersRouter.post("/:id", authMiddleware, followUserController);
followersRouter.delete("/unfollow/:id", unfollowUserController);

followersRouter.get("/:id", getFollowersController);
followersRouter.get("/:id", getFollowingController);

export default followersRouter;