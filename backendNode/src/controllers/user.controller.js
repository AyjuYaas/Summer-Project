import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import axios from "axios";

export const updateProfile = async (req, res) => {
  try {
    const { image, ...otherFields } = req.body;
    const updatedData = otherFields;

    if (image) {
      // base64 format
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResponse.secure_url;
        } catch (err) {
          return status(400).json({
            success: false,
            message: "Error uploading image. Profile cannot be updated!",
          });
        }
      }
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
  try {
    const response = await axios.post(process.env.FLASK_URL, {
      text: problem,
    });

    const { confidence_scores } = response.data;

    const filteredProblems = Object.fromEntries(
      Object.entries(confidence_scores).filter(([_, value]) => value > 0.1)
    );

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { problems: filteredProblems },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(`Error in problem of user: ${error}`);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
