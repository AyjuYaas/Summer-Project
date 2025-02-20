import express from "express";
import {
  signup,
  login,
  logout,
} from "../controllers/therapistAuth.controller.js";
import { protectRoute } from "../middleware/therapistAuth.middle.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// When the user checks if they are authenticated or not -
// The middleware protectRoute is called -
router.get("/me", protectRoute, async (req, res) => {
  res.send({
    success: true,
    therapist: req.therapist,
  });
});

export default router;
