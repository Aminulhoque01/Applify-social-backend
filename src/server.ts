import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRouter from "./model/auth/auth.route";
import postRouter from "./model/post/post.route";
import commentRouter from "./model/comment/comment.route";
import LinkRouter from "./model/like/like.route";
import followersRouter from "./model/follow/follow.route";
import { initSocket } from "./socket/socket";
import http from "http"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());


const server = http.createServer(app);

export const io = initSocket(server);

server.listen(5000, () => {
  console.log("Server running");
});

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/follow", followersRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", LinkRouter);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});

// Database + Server start
async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();