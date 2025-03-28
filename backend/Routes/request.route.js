import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js"; 
import { sendRequest, acceptRequest, deleteRequest, getConnectionRequests, sendGroupRequest, acceptGroupRequest } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/:userId/send-request",authMiddleware, sendRequest);
router.put("/:requestId/accept-request", authMiddleware, acceptRequest);
router.put("/:requestId/delete-request", authMiddleware, deleteRequest);
router.get("/connection-requests", authMiddleware, getConnectionRequests);
router.post("/:userId/:groupId/send-group-request", authMiddleware, sendGroupRequest);
router.put("/:groupRequestId/accept-request", authMiddleware, acceptGroupRequest);

export default router;