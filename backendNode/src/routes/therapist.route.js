import express from "express";
import { protectRoute } from "../middleware/auth.middle.js";
import {
  updateTherapist,
  respondRequest,
} from "../controllers/therapist.controller.js";

const router = express.Router();

router.use(protectRoute);

router.put("/update", updateTherapist);

// To handle requests
router.post("/request/respond", respondRequest);

export default router;
