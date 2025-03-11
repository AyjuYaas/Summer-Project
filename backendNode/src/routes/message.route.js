import express from "express";
import { protectRoute } from "../middleware/auth.middle.js";

import {
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/send", sendMessage);
router.get("/conversation/:receiverId", getConversation);

export default router;
