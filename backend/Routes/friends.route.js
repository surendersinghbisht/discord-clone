import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getFriends, FindFriends } from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/get-friends", authMiddleware, getFriends);
router.get("/find/:username", authMiddleware, FindFriends);

export default router;

