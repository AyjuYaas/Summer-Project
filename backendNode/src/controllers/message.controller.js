import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    if (!content || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Content and receiverId are required.",
      });
    }

    let senderId = req.user._id;
    let senderType = "";
    let receiverType = "";

    if (req.baseUrl === "/api/users") {
      senderType = "User";
      receiverType = "Therapist";
    } else {
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
    let senderType = "";
    let receiverType = "";

    if (req.baseUrl === "/api/users") {
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
