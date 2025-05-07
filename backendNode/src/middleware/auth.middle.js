import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Therapist from "../models/therapist.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Grab the token cookie from the user
    const token = req.cookies.jwt;

    // Condition if there is no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - No token provided",
      });
    }

    // ========== Verify a token ===========
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Condition if the token cannot be verified
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - Invalid Token",
      });
    }

    let currentUser;

    // Finally, if neither, then token is valid, thus find the user
    if (decode.role === "user") {
      currentUser = await User.findById(decode.id);
    } else {
      currentUser = await Therapist.findById(decode.id);
    }
    // Send the user to the requesting function
    req.user = currentUser;
    req.role = decode.role;
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
