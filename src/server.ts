import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api", routes);

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