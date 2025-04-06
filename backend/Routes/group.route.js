import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {createGroup, getGroups, addChannel, getAllChannelsForGroup } from "../controllers/group.controller.js"
const router = express.Router();

router.post("/create-group", authMiddleware, createGroup);
router.get("/get-groups", authMiddleware, getGroups);
router.post("/add-channel", authMiddleware, addChannel);
router.get("/get-channels/:groupId", authMiddleware, getAllChannelsForGroup )


export default router;