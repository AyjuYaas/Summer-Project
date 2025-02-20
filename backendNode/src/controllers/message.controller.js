import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;
    var senderId = "";
    var senderType = "";
    var receiverType = "";

    if (req.baseUrl === "/api/users") {
      senderId = req.user._id;
      senderType = "User";
      receiverType = "Therapist";
    } else {
      senderId = req.therapist._id;
      senderType = "Therapist";
      receiverType = "User";
    }

    const newMessage = await Message.create({
      sender: senderId,
      senderType,
      receiver: receiverId,
      receiverType,
      content,
    });

    // Send the message in real time

    res.status(201).json({
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
    var senderId = "";
    var senderType = "";
    var receiverType = "";

    if (req.baseUrl === "/api/users") {
      senderId = req.user._id;
      senderType = "User";
      receiverType = "Therapist";
    } else {
      senderId = req.therapist._id;
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
