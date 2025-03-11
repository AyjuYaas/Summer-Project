export const testMessage = async (req, res) => {
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
