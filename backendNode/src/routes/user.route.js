import express from "express";
import { isUser } from "./../middleware/auth.middle.js";
import {
  updateProfile,
  problem,
  removeTherapist,
  reviewTherapist,
  removeRequest,
  getExistingReview,
  updateDetails,
  getPreference,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(isUser);

router.get("/update-details", updateDetails);
router.put("/update", updateProfile);

router.get("/get-preference", getPreference);
router.put("/problems", problem);

router.post("/reviewTherapist", reviewTherapist);
router.get("/existing-review/:therapistId", getExistingReview);

router.post("/removeTherapist/:therapistId", removeTherapist);

router.post("/removeRequest", removeRequest);

export default router;
