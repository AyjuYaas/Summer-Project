import Therapist from "../models/therapist.model.js";
import jwt from "jsonwebtoken";

// Create a new token based on id
const signToken = (id) => {
  //return jwt token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    specialization,
    experience,
    qualification,
  } = req.body;

  try {
    // =========== Check if all the values are provided =============
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !specialization ||
      !experience ||
      !qualification
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // =========== Check if the password is less than 6 ===========
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // ============== Check if the phone-number is 10 digits ============
    if (phone.length < 10 || phone.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number should be 10 digits",
      });
    }

    // =========== If everything is okay, create the new Therapist
    const newTherapist = await Therapist.create({
      name,
      email,
      password,
      phone,
      specialization,
      experience,
      qualification,
    });

    // ========= Create a therapist token ============
    const token = signToken(newTherapist._id);

    // ========= Create a jwt token ===========
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    // ============= Send Success Message ===========
    res.status(201).json({
      success: true,
      therapist: newTherapist,
    });
  } catch (err) {
    console.log(`Error in therapist signup controller: ${err}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the therapist from the db
    const therapist = await Therapist.findOne({ email }).select("+password");

    // === if no therapist is found return error ======
    if (!therapist || !(await therapist.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ======= Create a user token =========
    const token = signToken(therapist._id);

    // ======== create a jwt token ==========
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      therapist,
    });
  } catch (err) {
    console.log(`Error in therapist login controller: ${err}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
};
