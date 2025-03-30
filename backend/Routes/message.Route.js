import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { getMessages } from '../controllers/message.controller.js';
const router = express.Router();

router.get('/get-messages/:senderId/:recieverId',authMiddleware, getMessages);

export default router;
