 
import { Conversation } from "../Conversation/conversation.model";
import { Message } from "./message.model";

const createConversation = async (user1: string, user2: string) => {
  const existing = await Conversation.findOne({
    members: { $all: [user1, user2] },
  });

  if (existing) return existing;

  return await Conversation.create({
    members: [user1, user2],
  });
};

const sendMessage = async (
  conversationId: string,
  sender: string,
  text: string
) => {
  return await Message.create({
    conversationId,
    sender,
    text,
  });
};

const getMessages = async (conversationId: string) => {
  return await Message.find({ conversationId })
    .populate("sender", "username profileImage")
    .sort({ createdAt: 1 });
};

const getUserConversations = async (userId: string) => {
  return await Conversation.find({
    members: { $in: [userId] },
  }).populate("members", "username profileImage");
};

export const ChatService = {
  createConversation,
  sendMessage,
  getMessages,
  getUserConversations,
};