import express from "express";
import { protectRoute } from "./../middleware/auth.middle.js";
import {
  updateProfile,
  problem,
  removeTherapist,
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.put("/update", updateProfile);

router.put("/problems", problem);

router.post("/removeTherapist/:therapistId", removeTherapist);

export default router;
