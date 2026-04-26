import { Server } from "socket.io";
import { User } from "../model/User/user.model";
 

const onlineUsers = new Map<string, string>();

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-online", async (userId: string) => {
      onlineUsers.set(userId, socket.id);

      await User.findByIdAndUpdate(userId, {
        isOnline: true,
      });

      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

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