import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getFriends } from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/get-friends", authMiddleware, getFriends);

export default router;

