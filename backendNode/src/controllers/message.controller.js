import Document from "../models/document.model.js";
import Match from "../models/match.model.js";
import Message from "../models/message.model.js";
import { getConnectedUsers, getIo } from "../socket/socket.server.js";
import cloudinary from "./../config/cloudinary.js";
import { AccessToken } from "livekit-server-sdk";

const onVideoCallParticipant = [];

const createToken = async (match, name) => {
  // If this room doesn't exist, it'll be automatically created when the first
  // participant joins
  const roomName = match;
  // Identifier to be used for participant.
  // It's available as LocalParticipant.identity with livekit-client SDK
  const participantName = name;

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: participantName,
      // Token to expire after 10 minutes
      ttl: "10m",
    }
  );
  at.addGrant({ roomJoin: true, room: roomName });

  return await at.toJwt();
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, receiverId } = req.body;

    let senderId = req.user._id;
    let senderType;
    let receiverType;

    if (req.role === "user") {
      senderType = "User";
      receiverType = "Therapist";

      const existingRequest = await Match.find({
        user: senderId,
        therapist: receiverId,
        status: "Accept",
      });

      if (existingRequest.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Not connected with the therapist",
        });
      }
    } else if (req.role === "therapist") {
      senderType = "Therapist";
      receiverType = "User";
      const existingRequest = await Match.find({
        user: receiverId,
        therapist: senderId,
        status: "Accept",
      });

      if (existingRequest.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Not connected with the User",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role",
      });
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
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "TheraFind/ChatImages",
          });
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
    const { cursor, limit = 20 } = req.query; // cursor is the last message ID or timestamp

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required.",
      });
    }

    const senderId = req.user._id;

    // Query to fetch messages
    const query = {
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    };

    // If cursor is provided, fetch messages older than the cursor
    if (cursor) {
      query._id = { $lt: cursor }; // Fetch messages older than the cursor
    }

    // Fetch `limit + 1` messages to determine if there's more
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) + 1); // Fetch one extra message

    // Check if there are more messages
    const hasMore = messages.length > limit;

    // Remove the extra message if present
    if (hasMore) {
      messages.pop();
    }

    res.status(200).json({
      success: true,
      messages: messages.reverse(), // Reverse to display oldest first
      nextCursor: hasMore ? messages[0]._id : null, // Send next cursor only if more messages exist
      hasMore, // Indicate if there are more messages to load
    });
  } catch (error) {
    console.error(`Error in getConversation: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const sendDocument = async (req, res) => {
  try {
    const { document, description, receiverId, fileName } = req.body;

    // Validate required fields
    if (!document || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    let senderId = req.user._id;
    let senderType;
    let receiverType;

    // Validate sender role and connection
    if (req.role === "user") {
      senderType = "User";
      receiverType = "Therapist";

      const existingRequest = await Match.find({
        user: senderId,
        therapist: receiverId,
        status: "Accept",
      });

      if (existingRequest.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Not connected with the therapist.",
        });
      }
    } else if (req.role === "therapist") {
      senderType = "Therapist";
      receiverType = "User";

      const existingRequest = await Match.find({
        user: receiverId,
        therapist: senderId,
        status: "Accept",
      });

      if (existingRequest.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Not connected with the user.",
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized role.",
      });
    }

    // Validate document format
    if (!document.startsWith("data:application/pdf")) {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed.",
      });
    }

    // Validate document size
    const MAX_DOCUMENT_SIZE = 50 * 1024 * 1024; // 50MB
    const fileSize = Buffer.byteLength(document, "base64");
    if (fileSize > MAX_DOCUMENT_SIZE) {
      return res.status(400).json({
        success: false,
        message: "Document size exceeds the limit of 50MB.",
      });
    }

    // Upload document to Cloudinary
    let documentURL;
    let publicId;
    try {
      const uploadResponse = await cloudinary.uploader.upload(document, {
        folder: "TheraFind/Documents",
        resource_type: "raw", // Ensure PDFs are treated as raw files
      });
      documentURL = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(400).json({
        success: false,
        message: "Error uploading document. Please try again.",
      });
    }

    // Create document entry in the database
    const documentData = {
      sender: senderId,
      senderType,
      receiver: receiverId,
      receiverType,
      document: documentURL,
      publicId,
      size: fileSize,
      description: description?.trim(),
      fileName: fileName || "unknown.pdf", // ✅ Save the PDF name
    };

    const newDocument = await Document.create(documentData);

    // Send Socket.IO notification
    const io = getIo();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newDocument", {
        document: newDocument,
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      document: newDocument,
    });
  } catch (error) {
    console.error("Error in sendDocument:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { cursor, limit = 20 } = req.query; // cursor is the last message ID

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

    const query = {
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    };

    // If cursor is provided, fetch messages older than the cursor
    if (cursor) {
      query._id = { $lt: cursor }; // Fetch messages older than the cursor
    }

    // Fetch `limit + 1` messages to determine if there's more
    const documents = await Document.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) + 1); // Fetch one extra message

    // Check if there are more messages
    const hasMore = documents.length > limit;

    // Remove the extra message if present
    if (hasMore) {
      documents.pop();
    }

    res.status(200).json({
      success: true,
      documents: documents.reverse(), // Reverse to display oldest first
      nextCursor: hasMore ? documents[0]._id : null, // Send next cursor only if more messages exist
      hasMore, // Indicate if there are more messages to load
    });
  } catch (error) {
    console.error(`Error in getDocuments: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getToken = async (req, res) => {
  try {
    const { receiverId, name } = req.query;

    if (!receiverId) {
      return res.status(400).json({
        success: false,
        message: "Receiver ID is required.",
      });
    }

    const senderId = req.user._id;
    let match;

    if (req.role === "user") {
      match = await Match.find({
        user: senderId,
        therapist: receiverId,
      });
    } else {
      match = await Match.find({
        user: receiverId,
        therapist: senderId,
      });
    }

    if (match.length === 0) {
      res.status(400).json({
        success: false,
        message: "Not Authorized to Join The Call",
      });
    }

    // ==== SOCKET IO NOTIFICATION =====
    const io = getIo();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("IncomingVideoCall", {
        sender: senderId,
        message: "Incoming Video Call",
      });
    }

    res.send(await createToken(match[0]._id.toString(), name));
  } catch (error) {
    console.log(error);
  }
};
