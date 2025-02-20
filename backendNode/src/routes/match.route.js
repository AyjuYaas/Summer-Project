import express from "express";
import { protectRoute } from "../middleware/userAuth.middle.js";
import {
  getMatches,
  getRecommendation,
  getTherapist,
  selectTherapist,
} from "../controllers/match.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/selectTherapist/:therapistId", selectTherapist);
router.get("/", getMatches);
router.get("/get-therapist", getTherapist);
router.get("/get-recommendation", getRecommendation);

export default router;
