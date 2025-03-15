import express from "express";
import { protectRoute } from "../middleware/auth.middle.js";

import {
  getConversation,
  getDocuments,
  getToken,
  sendDocument,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/send", sendMessage);
router.get("/conversation/:receiverId", getConversation);

router.post("/send-document", sendDocument);
router.get("/get-documents/:receiverId", getDocuments);

router.get("/call/getToken/", getToken);

export default router;
