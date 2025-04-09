import express from "express";
import {signup, login, logout, getCurrentUser} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
 
const router  = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",authMiddleware, logout);
router.get("/me",authMiddleware, getCurrentUser);

export default router;