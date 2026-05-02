import { Request, Response } from "express";
import { ChatService } from "./message.service";
 

export const createConversationController = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId as string;
  const { receiverId } = req.body;

  const convo = await ChatService.createConversation(
    userId,
    receiverId
  );

  res.json({ success: true, data: convo });
};

export const sendMessageController = async (
  req: Request,
  res: Response
) => {
  const sender = req.userId as string;
  const { conversationId, text } = req.body;

  const message = await ChatService.sendMessage(
    conversationId,
    sender,
    text
  );

  res.json({ success: true, data: message });
};

export const getMessagesController = async (
  req: Request,
  res: Response
) => {
  const messages = await ChatService.getMessages(
    req.params.conversationId as string
  );

  res.json({ success: true, data: messages });
};

export const getConversationsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId as string;

  const data =
    await ChatService.getUserConversations(userId);

  res.json({ success: true, data });
};