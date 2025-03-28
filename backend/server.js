import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import mongoose from "mongoose";
import requestRoute from "./Routes/request.route.js"
import userRoute from "./Routes/user.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import groupRoute from "./Routes/group.route.js"
import friendsRoute from "./Routes/friends.route.js"

const app = express();
dotenv.config();
app.use(
	cors({
	  origin: "http://localhost:5173", // ✅ Only allow requests from your frontend
	  credentials: true, // ✅ Allow cookies & credentials (important!)
	})
  );
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`);
		process.exit(1);
	}
};

app.use("/api/auth", authRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);
app.use("/api/group", groupRoute);
app.use("/api/friends", friendsRoute);

await connectDB();
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});