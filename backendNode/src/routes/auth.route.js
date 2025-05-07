import express from "express";

import { userSignup, userLogin } from "../controllers/userAuth.controller.js";
import {
  therapistLogin,
  therapistSignup,
} from "../controllers/therapistAuth.controller.js";
import { protectRoute } from "../middleware/auth.middle.js";

const router = express.Router();

router.post("/user/signup", userSignup);
router.post("/user/login", userLogin);

router.post("/therapist/signup", therapistSignup);
router.post("/therapist/login", therapistLogin);

// When the user checks if they are authenticated or not -
// The middleware protectRoute is called -
router.get("/me", protectRoute, async (req, res) => {
  try {
    if (!req.user || !req.role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    res.status(200).json({
      success: true,
      user: req.user,
      role: req.role,
    });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    console.log(`Error in Logout: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
