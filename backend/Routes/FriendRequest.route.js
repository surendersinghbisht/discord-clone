import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { acceptRequest, sendFriendRequest, getRequests } from "../controllers/FriendRequest.controller.js";



const router = express.Router();

router.post("/send-request/:recieverId", authMiddleware, sendFriendRequest);
router.put("/accept-request/:requestId", authMiddleware, acceptRequest);
router.get("/get-requests", authMiddleware, getRequests);

export default router;