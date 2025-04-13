import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {createGroup, getGroups, addChannel, getAllChannelsForGroup, getChannelDetail } from "../controllers/group.controller.js"
const router = express.Router();

router.post("/create-group", authMiddleware, createGroup);
router.get("/get-groups", authMiddleware, getGroups);
router.post("/add-channel", authMiddleware, addChannel);
router.get("/get-channels/:groupId", authMiddleware, getAllChannelsForGroup );
router.get("/get-channel/:channelId", authMiddleware, getChannelDetail);


export default router;