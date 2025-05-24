import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";

// Routes
import authRoutes from "./routes/auth.route.js"; // done
import userRoutes from "./routes/user.route.js"; // done
import therapistRoutes from "./routes/therapist.route.js";
import matchRoutes from "./routes/match.route.js";
import messageRoutes from "./routes/message.route.js";
import adminRoutes from "./routes/admin.route.js";
import { allTherapist } from "./routes/allTherapist.route.js";

// lib imports
import { connectDB } from "./config/database.js";
import { initializeSocket } from "./socket/socket.server.js";

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
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/admin", adminRoutes);
app.get("/api/all-therapist", allTherapist);

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
