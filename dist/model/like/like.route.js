"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("./like.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const LinkRouter = express_1.default.Router();
// like/unlike
LinkRouter.post("/", auth_middleware_1.authMiddleware, like_controller_1.toggleLike);
// get likes
LinkRouter.get("/", auth_middleware_1.authMiddleware, like_controller_1.getLikes);
exports.default = LinkRouter;
