import cloudinary from "../config/cloudinary.js";
import Request from "../models/request.model.js";
import Therapist from "../models/therapist.model.js";
import { validate } from "email-validator";
import User from "../models/user.model.js";
import { getConnectedUsers, getIo } from "../socket/socket.server.js";

export async function updateTherapist(req, res) {
  try {
    const { image, ...otherFields } = req.body;
    const updatedData = otherFields;

    // Uploading image to cloudinary
    if (image) {
      // base 64 formal
      if (image.startsWith("data:image")) {
        try {
          // incase of new Image
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
            // incase of existing image, replace their image
            const uploadResponse = await cloudinary.uploader.upload(image, {
              public_id: req.user.imagePublicId,
              crop: "auto",
              width: 500,
              height: 500,
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

    // ======= Return user data without the password ===========
    const therapistWithoutPassword = { ...updatedTherapist.toObject() };
    delete therapistWithoutPassword.password;

    res.status(200).json({
      success: true,
      user: therapistWithoutPassword,
    });
  } catch (error) {
    console.log(`Error in Therapist profile update: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function respondRequest(req, res) {
  // ======= Get the request Id and response of the therapist =========
  const { requestId, response } = req.body;
  const therapistId = req.user._id;

  try {
    // ======= Find the request from db ========
    const requestByUser = await Request.findById(requestId);

    // ======= If there is no response ======
    if (!requestByUser) {
      return res.status(400).json({
        success: false,
        message: "Request not found.",
      });
    }

    // ======= If the request was not sent by the associated therapist
    if (!requestByUser.therapist.equals(therapistId)) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to respond to this request.",
      });
    }

    // ======= If nothing find the therapist and the user
    const therapist = await Therapist.findById(therapistId);
    const user = await User.findById(requestByUser.user);

    // ======= If either therapist or use does not exist
    if (!user || !therapist) {
      return res.status(400).json({
        success: false,
        message: "User or Therapist not found.",
      });
    }

    // ======= If therapist is already matched with the user
    if (therapist.matched_user.includes(user._id)) {
      return res.status(400).json({
        success: false,
        message: "Request already responded to",
      });
    }

    // ====================================================
    // ======= Use Socket IO to send the notification
    const connectedUsers = getConnectedUsers();
    const io = getIo();
    // ======= Check the connection id of the sending user ==========
    const requestingUserSocketId = connectedUsers.get(user._id.toString());
    // ====================================================

    // ======= If therapist accepts the request ==========
    if (response === "accept") {
      // ======= Change the status of request to Accept
      requestByUser.status = "Accept";

      // ======= Push the selection into the respective therapist and user ======
      user.selected_therapists.push(therapistId);
      therapist.matched_user.push(requestByUser.user);

      // ======= Save the changes in the database
      await Promise.all([requestByUser.save(), user.save(), therapist.save()]);

      // ====================================================
      // ======= Send the response to the User about the status
      if (requestingUserSocketId) {
        io.to(requestingUserSocketId).emit("requestResponse", {
          success: true,
          name: therapist.name,
        });
      }
      // ====================================================

      return res.status(200).json({
        success: true,
        message: "Request Accepted Successfully",
      });
    }

    // If therapist rejected the request
    if (response === "reject") {
      // ======= Set the status to decline ===========
      requestByUser.status = "Decline";

      // ======= Save the changes to db ===========
      await requestByUser.save();

      // ====================================================
      // ======= Send the response to the User about the status
      if (requestingUserSocketId) {
        io.to(requestingUserSocketId).emit("requestResponse", {
          success: false,
          name: therapist.name,
        });
      }
      // ====================================================

      return res.status(200).json({
        success: true,
        message: "Request Rejected",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid response provided.",
    });
  } catch (error) {
    console.log("Error at RequestRespond " + error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
