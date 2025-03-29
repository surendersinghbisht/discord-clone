import express from "express";
import http from "http"; // ✅ Required for Socket.io
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import requestRoute from "./Routes/request.route.js";
import userRoute from "./Routes/user.route.js";
import groupRoute from "./Routes/group.route.js";
import friendsRoute from "./Routes/friends.route.js";
import messageRoute from "./Routes/message.Route.js"; // ✅ Import Message Route

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Create HTTP server for Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ Allow frontend connection
    credentials: true,
  },
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend with Socket.io");
});

// ✅ MongoDB Connection Function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// ✅ Pass `io` to controllers
import {messageController} from "./controllers/message.controller.js"
messageController(io); // ✅ Pass `io` to the message controller

// ✅ API Routes
app.use("/api/auth", authRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);
app.use("/api/group", groupRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/message", messageRoute); // ✅ Message API

// ✅ Start Server
const startServer = async () => {
  await connectDB();
  server.listen(5000, () => {
    console.log(`🚀 Server with Socket.io is running on port 5000`);
  });
};

startServer();
