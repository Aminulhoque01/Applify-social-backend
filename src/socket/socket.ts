import { Server } from "socket.io";
import { User } from "../model/User/user.model";
import { Notification } from "../model/notification/notification.model";
 

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

    // 🟢 USER ONLINE
    socket.on("user-online", async (userId: string) => {
      onlineUsers.set(userId, socket.id);

      await User.findByIdAndUpdate(userId, {
        isOnline: true,
      });

      // 🔔 send unread notification count
      const count = await Notification.countDocuments({
        receiver: userId,
        isRead: false,
      });

      socket.emit("notification-count", count);

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // ❌ DISCONNECT
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