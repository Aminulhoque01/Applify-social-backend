import express from "express";
import {
  toggleLike,
  getLikes,
} from "./like.controller";
import { authMiddleware } from "../middleware/auth.middleware";
 

const LinkRouter = express.Router();

// like/unlike
LinkRouter.post("/", authMiddleware, toggleLike);

// get likes
LinkRouter.get("/", authMiddleware, getLikes);

export default LinkRouter;