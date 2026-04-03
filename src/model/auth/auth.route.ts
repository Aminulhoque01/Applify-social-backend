import express from "express";
import { register, login } from "./auth.controller";

const AuthRouter = express.Router();

AuthRouter.post("/register", register);
AuthRouter.post("/login", login);

export default AuthRouter;