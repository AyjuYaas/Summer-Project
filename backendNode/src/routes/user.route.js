import express from "express";
import { protectRoute } from "./../middleware/userAuth.middle.js";
import { updateProfile, problem } from "../controllers/user.controller.js";
import {
  sendMessage,
  getConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/update", updateProfile);

router.post("/problems", problem);

// To send messages
router.post("/message/send", sendMessage);
router.get("/message/conversation/:receiverId", getConversation);

export default router;
