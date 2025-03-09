import express from "express";
import { protectRoute } from "../middleware/auth.middle.js";
import {
  updateTherapist,
  respondRequest,
} from "../controllers/therapist.controller.js";
import {
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.put("/update", updateTherapist);

// To send messages
router.post("/message/send", sendMessage);
router.get("/message/conversation/:receiverId", getConversation);

// To handle requests
router.post("/request/respond", respondRequest);

export default router;
