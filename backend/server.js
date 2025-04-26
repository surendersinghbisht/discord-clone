import express from "express";
import http from "http"; 
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./Routes/auth.route.js";
import requestRoute from "./Routes/request.route.js";
import userRoute from "./Routes/user.route.js";
import groupRoute from "./Routes/group.route.js";
import friendsRoute from "./Routes/friends.route.js";
import messageRoute from "./Routes/message.Route.js"; 
import FriendRequestRoute from "./Routes/FriendRequest.route.js";

import { messageController } from "./controllers/message.controller.js";
import { groupMessage } from "./controllers/groupMessage.controller.js";

dotenv.config();

const app = express();
const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "https://discord-clone-wvvy.vercel.app/",
    credentials: true,
  },
});

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "https://discord-clone-wvvy.vercel.app/", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello from backend with Socket.io");
});

app.use("/api/auth", authRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);
app.use("/api/group", groupRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/message", messageRoute); 
app.use("/api/request", FriendRequestRoute);

// Static frontend (optional if you’re serving React build)
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Socket.io controllers
messageController(io); 
groupMessage(io);

// MongoDB + Server start
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server with Socket.io is running on port ${PORT}`);
  });
};

startServer();
