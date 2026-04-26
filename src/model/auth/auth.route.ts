import express from "express";
import { register, login, getUserController, updateUserController,   getAllUser } from "./auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload";
 

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.get("/all-user", getAllUser);
// Get single user
AuthRouter.get("/me", authMiddleware, getUserController);

// Update user
AuthRouter.put("/",   authMiddleware,
  upload.single("profileImage"), updateUserController);

  

export default AuthRouter;