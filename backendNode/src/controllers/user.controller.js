import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import axios from "axios";
import { validate } from "email-validator";

export const updateProfile = async (req, res) => {
  try {
    // ============== Get the Updated Data ==============
    const { image, ...otherFields } = req.body;
    const updatedData = otherFields;

    // ============== Upload image to cloudinary ==============
    if (image) {
      // base64 format
      if (image.startsWith("data:image")) {
        try {
          // Incase it is their first upload
          if (!req.user.imagePublicId) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              crop: "auto",
              width: 500,
              height: 500,
              gravity: "auto",
            });
            updatedData.image = uploadResponse.secure_url;
            updatedData.imagePublicId = uploadResponse.public_id;
          } else {
            // incase they are changing their image, replace the one on cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image, {
              public_id: req.user.imagePublicId,
              crop: "auto",
              width: 500,
              height: 500,
              gravity: "auto",
            });
            updatedData.image = uploadResponse.secure_url;
          }
        } catch (err) {
          console.log(err);
          return res.status(400).json({
            success: false,
            message: "Error uploading image. Profile cannot be updated!",
          });
        }
      }
    }

    // ========== Email Validation ============
    if (!validate(updatedData.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email Address",
      });
    }

    // ============== Check if the phone-number is 10 digits ============
    if (updatedData.phone.length < 10 || updatedData.phone.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number should be 10 digits",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    console.log(`Error in update user profile: ${err}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const problem = async (req, res) => {
  const { problem } = req.body;

  if (!problem) {
    return res.status(400).json({
      success: false,
      message: "Problem text is required.",
    });
  }

  // Trim the problem for any line-breaks at the end
  const problemTrimmed = problem.replace(/\n+$/, "");

  const wordCount = problemTrimmed
    .split(/\s+/) // Split by whitespace
    .filter((word) => word.length > 0).length; // Filter out empty strings

  if (wordCount < 20) {
    return res.status(400).json({
      success: false,
      message: "Problem text must be at least 20 characters long.",
    });
  }

  try {
    // Get response from the flask api
    const response = await axios.post(process.env.FLASK_URL, {
      text: problemTrimmed,
    });

    // Get the classification of diseases
    const { confidence_scores } = response.data;

    // Convert the object into array
    const filteredProblems = Object.entries(confidence_scores)
      .filter(([_, value]) => value > 0.1)
      .map(([problem, score]) => ({ problem, score }));

    // Update the user's problem text and problems
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { problemText: problemTrimmed, problems: filteredProblems },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      problems: updatedUser,
    });
  } catch (error) {
    console.log(`Error in problem of user: ${error}`);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
