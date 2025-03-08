import cloudinary from "../config/cloudinary.js";
import Therapist from "../models/therapist.model.js";
import { validate } from "email-validator";

export default async function updateTherapist(req, res) {
  try {
    const { image, ...otherFields } = req.body;
    const updatedData = otherFields;

    if (image) {
      // base 64 formal
      if (image.startsWith("data:image")) {
        try {
          if (!req.user.imagePublicId) {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              crop: "auto",
              width: 300,
              height: 300,
              gravity: "auto",
            });
            updatedData.image = uploadResponse.secure_url;
            updatedData.imagePublicId = uploadResponse.public_id;
          } else {
            const uploadResponse = await cloudinary.uploader.upload(image, {
              public_id: req.user.imagePublicId,
              crop: "auto",
              width: 300,
              height: 300,
              gravity: "auto",
            });
            updatedData.image = uploadResponse.secure_url;
          }
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Error uploading image. Profile cannot be updated!",
          });
        }
      }
    }

    // ============== Email Validation ============
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

    const updatedTherapist = await Therapist.findByIdAndUpdate(
      req.user._id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      therapist: updatedTherapist,
    });
  } catch (error) {
    console.log(`Error in Therapist profile update: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
