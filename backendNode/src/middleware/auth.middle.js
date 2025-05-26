import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Therapist from "../models/therapist.model.js";
import Admin from "../models/admin.model.js";
import therapistRatingandMatch from "../utils/therapistRatingandMatch.js";

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
      // Send the user to the requesting function
      req.user = {
        _id: currentUser._id,
        name: currentUser.name,
        age: currentUser.age,
        gender: currentUser.gender,
        image: currentUser.image,
        problemText: currentUser.problemText,
        problems: currentUser.problems,
      };
      req.role = decode.role;
    } else if (decode.role === "therapist") {
      currentUser = await Therapist.findById(decode.id);
      // Send the user to the requesting function
      const stats = await therapistRatingandMatch(decode.id);
      req.user = {
        _id: currentUser._id,
        name: currentUser.name,
        image: currentUser.image,
        rating: stats.rating,
        reviewCount: stats.reviewCount,
        validationStatus: currentUser.validationStatus,
      };
      req.role = decode.role;
    } else if (decode.role === "admin") {
      currentUser = await Admin.findById(decode.id);
      // Send the user to the requesting function
      req.user = {
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
      };
      req.role = decode.role;
    }
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

export const isUser = async (req, res, next) => {
  try {
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

    // Finally, if neither, then token is valid, thus find the user
    if (decode.role === "user") {
      const currentUser = await User.findById(decode.id);
      // Send the user to the requesting function
      req.user = {
        _id: currentUser._id,
        name: currentUser.name,
        age: currentUser.age,
        gender: currentUser.gender,
        image: currentUser.image,
      };
      req.role = decode.role;
    } else {
      res.status(401).json({
        status: false,
        message: "Not Authorized",
      });
    }
    next();
  } catch (error) {
    console.log(`Error in auth middleware - isUser: ${err}`);
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

export const isTherapist = async (req, res, next) => {
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
    if (decode.role === "therapist") {
      currentUser = await Therapist.findById(decode.id);
      const stats = await therapistRatingandMatch(decode.id);
      // Send the user to the requesting function
      req.user = {
        _id: currentUser._id,
        name: currentUser.name,
        image: currentUser.image,
        rating: stats.rating,
        reviewCount: stats.reviewCount,
      };
      req.role = decode.role;
    } else {
      res.status(401).json({
        status: false,
        message: "Not Authorized",
      });
    }
    next();
  } catch (err) {
    console.log(`Error in auth middleware - isTherapist: ${err}`);
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

export const isAdmin = async (req, res, next) => {
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

    // Finally, if neither, then token is valid, thus find the user
    if (decode.role === "admin") {
      req.user = decode.id;
      req.role = decode.role;
    } else {
      res.status(401).json({
        status: false,
        message: "Not Authorized",
      });
    }
    next();
  } catch (err) {
    console.log(`Error in auth middleware - isAdmin: ${err}`);
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
