import jwt from "jsonwebtoken";
import Therapist from "../models/therapist.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Grab the token from the cookies
    const token = req.cookies.jwt;

    // Condition if the token is empty
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - No token provided",
      });
    }

    // ============= Decode the token ========
    const decode = jwt.decode(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid Token",
      });
    }

    const currentTherapist = await Therapist.findById(decode.id);

    req.therapist = currentTherapist;
    next();
  } catch (err) {
    console.log(`Error in auth middleware: ${err}`);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid token",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
