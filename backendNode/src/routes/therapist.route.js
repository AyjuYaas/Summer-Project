import express from "express";
import { protectRoute } from "../middleware/auth.middle.js";
import updateTherapist from "../controllers/therapist.controller.js";
import {
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/update", updateTherapist);

// To send messages
router.post("/message/send", sendMessage);
router.post("/message/conversation/:receiverId", getConversation);
export default router;
