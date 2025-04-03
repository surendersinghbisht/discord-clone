import express from "express";
import { getUserProfile, editProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile/:userId", authMiddleware, getUserProfile);
router.put("/editProfile", authMiddleware, editProfile);

export default router;