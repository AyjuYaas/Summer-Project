import Therapist from "../models/therapist.model.js";
import jwt from "jsonwebtoken";
import validator from "email-validator";

// Create a new token based on id
const signToken = (id) => {
  //return jwt token
  return jwt.sign({ id, role: "therapist" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const therapistSignup = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    gender,
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
      !gender ||
      !specialization ||
      !experience ||
      !qualification
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // ============== Email Validation ============
    if (!validator.validate(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
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
      gender,
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

    // ======= Return user data without the password ===========
    const therapistWithoutPassword = { ...newTherapist.toObject() };
    delete therapistWithoutPassword.password;

    // ============= Send Success Message ===========
    res.status(201).json({
      success: true,
      therapist: therapistWithoutPassword,
    });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern && err.keyPattern.phone) {
        return res.status(400).json({
          success: false,
          message:
            "Phone number already exists. Please use a different phone number.",
        });
      }

      if (err.keyPattern && err.keyPattern.email) {
        return res.status(400).json({
          success: false,
          message:
            "Email already exists. Please use a different email address.",
        });
      }
    }
    console.log(`Error in therapist signup controller: ${err}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const therapistLogin = async (req, res) => {
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

    // ======= Return user data without the password ===========
    const therapistWithoutPassword = { ...therapist.toObject() };
    delete therapistWithoutPassword.password;

    res.status(200).json({
      success: true,
      therapist: therapistWithoutPassword,
    });
  } catch (err) {
    console.log(`Error in therapist login controller: ${err}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
