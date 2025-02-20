import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// =========== Creates a token fot the user ===============
const signToken = (id) => {
  //jwt token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ============== User Signup Function ==============
export const signup = async (req, res) => {
  // ============= get these fields from the client ===========
  const { name, email, password, phone, age, gender } = req.body;

  try {
    // =========== Check if all the values are provided =============
    if (!name || !email || !password || !phone || !age || !gender) {
      return res.status(400).json({
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

    // ============ If everything okay, create the user ===========
    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      age,
      gender,
    });

    // =========== Create a user token =============
    const token = signToken(newUser._id);

    // ======= create a jwt token ===========
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    // ============= Send Success Message ===========
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (err) {
    console.log(`Error in user signup controller: ${err}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ============== User Login Function ==============
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ========= Check for any missing value ============
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ============= Find the user using their email and grab the password ==========
    const user = await User.findOne({ email }).select("+password");

    // ========== If no user exists ot password doesn't match throw error ===============
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // =========== Create a user token =============
    const token = signToken(user._id);

    // ======= create a jwt token ===========
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
      httpOnly: true, //prevents any XSS attacks
      sameSte: "strict", //prevents any CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(`Error in user login controller: ${err}`);
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
