import express from "express";
import { isTherapist } from "../middleware/auth.middle.js";
import {
  updateTherapist,
  respondRequest,
  updateDetails,
} from "../controllers/therapist.controller.js";

const router = express.Router();

router.use(isTherapist);

router.get("/update-details", updateDetails);
router.put("/update", updateTherapist);

// To handle requests
router.post("/request/respond", respondRequest);

export default router;
