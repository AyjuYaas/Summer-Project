import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protectRoute } from "./middleware/auth.middle.js";

// Routes
import userAuthRoutes from "./routes/userAuth.route.js"; // done
import therapistAuthRoutes from "./routes/therapistAuth.route.js"; // done
import userRoutes from "./routes/user.route.js"; // done
import therapistRoutes from "./routes/therapist.route.js";
import matchRoutes from "./routes/match.route.js";
import { allTherapist } from "./routes/allTherapist.route.js";

// lib imports
import { connectDB } from "./config/database.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend to access
    credentials: true, // Allow cookies if required
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ========= Establish all the routes in the project ==========
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/therapist", therapistAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/matches", matchRoutes);
app.get("/api/all-therapist", allTherapist);

// When the user checks if they are authenticated or not -
// The middleware protectRoute is called -
app.get("/api/auth/me", protectRoute, async (req, res) => {
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

app.post("/api/auth/logout", async (req, res) => {
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
