import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import userAuthRoutes from "./routes/userAuth.route.js"; // done
import therapistAuthRoutes from "./routes/therapistAuth.route.js"; // done
import userRoutes from "./routes/user.route.js"; // done
import therapistRoutes from "./routes/therapist.route.js";
import matchRoutes from "./routes/match.route.js";
// import messageRoute from "./routes/message.route.js";

// lib imports
import { connectDB } from "./config/database.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend to access
    methods: "GET, POST, PUT, DELETE", // Adjust methods as needed
    credentials: true, // Allow cookies if required
  })
);

app.use(express.json());
app.use(cookieParser());

// ========= Establish all the routes in the project ==========
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/therapist", therapistAuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/matches", matchRoutes);
// app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
