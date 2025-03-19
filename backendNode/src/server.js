import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protectRoute } from "./middleware/auth.middle.js";
import { createServer } from "http";

// Routes
import userAuthRoutes from "./routes/userAuth.route.js"; // done
import therapistAuthRoutes from "./routes/therapistAuth.route.js"; // done
import userRoutes from "./routes/user.route.js"; // done
import therapistRoutes from "./routes/therapist.route.js";
import matchRoutes from "./routes/match.route.js";
import messageRoutes from "./routes/message.route.js";
import { allTherapist } from "./routes/allTherapist.route.js";

// lib imports
import { connectDB } from "./config/database.js";
import { initializeSocket } from "./socket/socket.server.js";

import { testMessage } from "./routes/testMessage.js";

const app = express();
const httpServer = createServer(app);

initializeSocket(httpServer);

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow only your frontend to access
    credentials: true, // Allow cookies if required
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// ========= Establish all the routes in the project ==========
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/therapist", therapistAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);
app.get("/api/all-therapist", allTherapist);

app.get("/testing", () => {
  res.status(200).json({
    success: true,
    message: "Hey How are you!!",
  });
});

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

app.get("/test", testMessage);

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
