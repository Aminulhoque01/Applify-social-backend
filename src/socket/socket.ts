import { Server } from "socket.io";
import { User } from "../model/User/user.model";
import { Notification } from "../model/notification/notification.model";
import { Message } from "../model/message/message.model";
 

export const onlineUsers = new Map<string, string>();

let io: Server;

export const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // =========================
    // 🟢 USER ONLINE
    // =========================
    socket.on("user-online", async (userId: string) => {
      onlineUsers.set(userId, socket.id);

      await User.findByIdAndUpdate(userId, {
        isOnline: true,
      });

      // 🔔 unread notification count
      const count = await Notification.countDocuments({
        receiver: userId,
        isRead: false,
      });

      socket.emit("notification-count", count);

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // =========================
    // 💬 SEND MESSAGE
    // =========================
    socket.on("send-message", async (data) => {
      const { senderId, receiverId, text, conversationId } = data;

      try {
        // 💾 save message
        const message = await Message.create({
          sender: senderId,
          conversationId,
          text,
        });

        const receiverSocketId = onlineUsers.get(receiverId);

        if (receiverSocketId) {
          // 📩 send to receiver
          io.to(receiverSocketId).emit("receive-message", message);

          // ✅ delivered status
          io.to(receiverSocketId).emit("message-delivered", {
            messageId: message._id,
          });
        }

        // 📤 send back to sender (optional)
        socket.emit("message-sent", message);

      } catch (error) {
        console.log("Message error:", error);
      }
    });

    // =========================
    // 🟢 TYPING
    // =========================
    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", { senderId });
      }
    });

    socket.on("stop-typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stop-typing", { senderId });
      }
    });

    // =========================
    // 👁️ MESSAGE SEEN
    // =========================
    socket.on("message-seen", async ({ messageId, senderId }) => {
      await Message.findByIdAndUpdate(messageId, {
        isRead: true,
      });

      const senderSocketId = onlineUsers.get(senderId);

      if (senderSocketId) {
        io.to(senderSocketId).emit("message-seen", {
          messageId,
        });
      }
    });

    // =========================
    // ❌ DISCONNECT
    // =========================
    socket.on("disconnect", async () => {
      const disconnectedUser = [...onlineUsers.entries()].find(
        ([, socketId]) => socketId === socket.id
      );

      if (disconnectedUser) {
        const userId = disconnectedUser[0];

        onlineUsers.delete(userId);

        await User.findByIdAndUpdate(userId, {
          isOnline: false,
          lastSeen: new Date(),
        });

        io.emit(
          "online-users",
          Array.from(onlineUsers.keys())
        );
      }
    });
  });

  return io;
};