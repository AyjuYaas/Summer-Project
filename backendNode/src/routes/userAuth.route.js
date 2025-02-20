import express from "express";

import { signup, login, logout } from "../controllers/userAuth.controller.js";
import { protectRoute } from "../middleware/userAuth.middle.js";

import ImageKit from "imagekit";

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

router.get("/imageIO", async (req, res) => {
  const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_URL_END_POINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  });
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

export default router;
