import express from "express";
import { protectRoute } from "../middleware/auth.middle.js";

import {
  getMatches,
  getRecommendation,
  getTherapist,
  selectTherapist,
  getPendingRequest,
  getReviews,
} from "../controllers/match.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/selectTherapist/:therapistId", selectTherapist);
router.get("/get-requests", getPendingRequest);
router.get("/", getMatches);
router.get("/get-therapist", getTherapist);
router.get("/get-recommendation", getRecommendation);
router.get("/get-reviews/:therapistId", getReviews);

export default router;
