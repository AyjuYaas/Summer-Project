import express from "express";
import { protectRoute } from "./../middleware/auth.middle.js";
import {
  updateProfile,
  problem,
  removeTherapist,
  reviewTherapist,
  removeRequest,
  getExistingReview,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.put("/update", updateProfile);

router.put("/problems", problem);

router.post("/reviewTherapist", reviewTherapist);
router.get("/existing-review/:therapistId", getExistingReview);

router.post("/removeTherapist/:therapistId", removeTherapist);

router.post("/removeRequest", removeRequest);

export default router;
