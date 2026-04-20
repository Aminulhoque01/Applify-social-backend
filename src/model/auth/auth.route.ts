import express from "express";
import { register, login, getUserController, updateUserController, unfollowUser, followUser } from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload";
 

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
// Get single user
AuthRouter.get("/me", authMiddleware, getUserController);

// Update user
AuthRouter.put("/",   authMiddleware,
  upload.single("profileImage"), updateUserController);

AuthRouter.post("/follow/:id", followUser);
AuthRouter.post("/unfollow/:id", unfollowUser);  

export default AuthRouter;