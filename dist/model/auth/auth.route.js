"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_1 = require("../middleware/upload");
const AuthRouter = express_1.default.Router();
AuthRouter.post("/register", auth_controller_1.register);
AuthRouter.post("/login", auth_controller_1.login);
// Get single user
AuthRouter.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.getUserController);
// Update user
AuthRouter.put("/", auth_middleware_1.authMiddleware, upload_1.upload.single("profileImage"), auth_controller_1.updateUserController);
exports.default = AuthRouter;
