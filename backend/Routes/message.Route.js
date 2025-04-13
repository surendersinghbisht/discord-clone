import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getMessages } from '../controllers/message.controller.js';
import { getGroupMessages } from '../controllers/groupMessage.controller.js';
const router = express.Router();

router.get('/get-messages/:senderId/:recieverId',authMiddleware, getMessages);
router.get('/get-groupMessages/:senderId/:channelId', authMiddleware, getGroupMessages);

export default router;
