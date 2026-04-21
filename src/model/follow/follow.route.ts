import { Router } from "express";
import {
  followUserController,
  unfollowUserController,
  getFollowersController,
  getFollowingController,
} from "./follow.controller";

const router = Router();

router.post("/follow/:id", followUserController);
router.delete("/unfollow/:id", unfollowUserController);

router.get("/followers/:id", getFollowersController);
router.get("/following/:id", getFollowingController);

export default router;