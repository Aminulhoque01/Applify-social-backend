import { Server } from "socket.io";
import { User } from "../model/User/user.model";
import { Notification } from "../model/notification/notification.model";
import { Message } from "../model/message/message.model";
 

export const onlineUsers = new Map<string, string>();

let io: Server | null = null;

// ✅ safe getter
export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
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
      try {
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

        io?.emit("online-users", Array.from(onlineUsers.keys()));
      } catch (err) {
        console.log("user-online error:", err);
      }
    });

    // =========================
    // 💬 SEND MESSAGE
    // =========================
    socket.on("send-message", async (data) => {
      try {
        const { senderId, receiverId, text, conversationId } = data;

        // 💾 save DB
        const message = await Message.create({
          sender: senderId,
          conversationId,
          text,
        });

        const receiverSocketId = onlineUsers.get(receiverId);

        if (receiverSocketId) {
          // 📩 send to receiver
          io?.to(receiverSocketId).emit("receive-message", message);

          // ✅ delivered
          io?.to(receiverSocketId).emit("message-delivered", {
            messageId: message._id,
          });
        }

        // 📤 sender confirmation
        socket.emit("message-sent", message);

      } catch (err) {
        console.log("send-message error:", err);
      }
    });

    // =========================
    // 🟢 TYPING
    // =========================
    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io?.to(receiverSocketId).emit("typing", { senderId });
      }
    });

    socket.on("stop-typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io?.to(receiverSocketId).emit("stop-typing", { senderId });
      }
    });

    // =========================
    // 👁️ MESSAGE SEEN
    // =========================
    socket.on("message-seen", async ({ messageId, senderId }) => {
      try {
        await Message.findByIdAndUpdate(messageId, {
          isRead: true,
        });

        const senderSocketId = onlineUsers.get(senderId);

        if (senderSocketId) {
          io?.to(senderSocketId).emit("message-seen", {
            messageId,
          });
        }
      } catch (err) {
        console.log("seen error:", err);
      }
    });

    // =========================
    // ❌ DISCONNECT
    // =========================
    socket.on("disconnect", async () => {
      try {
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

          io?.emit(
            "online-users",
            Array.from(onlineUsers.keys())
          );
        }
      } catch (err) {
        console.log("disconnect error:", err);
      }
    });
  });

  return io;
};