import express from "express";
import { protectRoute } from "./../middleware/auth.middle.js";
import { updateProfile, problem } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.put("/update", updateProfile);

router.put("/problems", problem);

export default router;
