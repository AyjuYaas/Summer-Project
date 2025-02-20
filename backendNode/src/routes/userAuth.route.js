import express from "express";

import { signup, login, logout } from "../controllers/userAuth.controller.js";
import { protectRoute } from "../middleware/userAuth.middle.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// When the user checks if they are authenticated or not -
// The middleware protectRoute is called -
router.get("/me", protectRoute, async (req, res) => {
  res.send({
    success: true,
    user: req.user,
  });
});

export default router;
