import express from "express";
import { protectRoute } from "./../middleware/auth.middle.js";
import { updateProfile, problem } from "../controllers/user.controller.js";
import {
  sendMessage,
  getConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.put("/update", updateProfile);

router.put("/problems", problem);

// To send messages
router.post("/message/send", sendMessage);
router.get("/message/conversation/:receiverId", getConversation);

export default router;
