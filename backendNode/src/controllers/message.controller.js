import Message from "../models/message.model.js";
import { getConnectedUsers, getIo } from "../socket/socket.server.js";
import cloudinary from "./../config/cloudinary.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, image, receiverId } = req.body;

    let senderId = req.user._id;
    let senderType;
    let receiverType;

    if (req.role === "user") {
      senderType = "User";
      receiverType = "Therapist";
    } else {
      senderType = "Therapist";
      receiverType = "User";
    }

    if (!image && !text) {
      res.status(400).json({
        success: false,
        message: "Empty Fields",
      });
    }

    const messageData = {
      sender: senderId,
      senderType,
      receiver: receiverId,
      receiverType,
    };

    let imageURL;
    if (image) {
      // base 64 formal
      if (image.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageURL = uploadResponse.secure_url;
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Error uploading image!",
          });
        }
      }
      messageData.image = imageURL;
    }

    if (text) {
      messageData.text = text.trim();
    }

    const newMessage = await Message.create(messageData);

    // ==== SOCKET IO NOTIFICATION =====
    const io = getIo();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        message: newMessage,
      });
    }

    res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log(`Error in Send Message: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { receiverId } = req.params;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required.",
      });
    }

    let senderId = req.user._id;
    let senderType;
    let receiverType;

    if (req.role === "user") {
      senderType = "User";
      receiverType = "Therapist";
    } else {
      senderType = "Therapist";
      receiverType = "User";
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort("createdAt");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(`Error in getConversation: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
