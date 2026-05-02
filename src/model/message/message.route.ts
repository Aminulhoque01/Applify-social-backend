import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createConversationController, getConversationsController, getMessagesController, sendMessageController } from "./message.controller";
 
 

const chatRouter = Router();

chatRouter.post(
  "/conversation",
  authMiddleware,
  createConversationController
);

chatRouter.get(
  "/conversation",
  authMiddleware,
  getConversationsController
);

chatRouter.get(
  "/messages/:conversationId",
  authMiddleware,
  getMessagesController
);

chatRouter.post(
  "/message",
  authMiddleware,
  sendMessageController
);

export default chatRouter;