import { Router } from "express";
import { isAdmin } from "../middleware/auth.middle.js";
import {
  getApprovedTherapists,
  getIndividualTherapist,
  getPendingTherapists,
  getTherapistValidationStats,
  respondTherapist,
  updateProfile,
} from "../controllers/admin.controller.js";

const router = Router();

router.use(isAdmin);

router.get("/get-therapist/pending", getPendingTherapists);
router.get("/get-therapist/approved", getApprovedTherapists);
router.get("/get-therapist/stats", getTherapistValidationStats);
router.get("/get-therapist/:therapistId", getIndividualTherapist);

router.put("/respond-therapist/:therapistId", respondTherapist);

router.put("/update-profile", updateProfile);

export default router;
