"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const commentRouter = express_1.default.Router();
commentRouter.post("/:postId", auth_middleware_1.authMiddleware, comment_controller_1.createComment);
commentRouter.get("/:postId", auth_middleware_1.authMiddleware, comment_controller_1.getComments);
exports.default = commentRouter;
