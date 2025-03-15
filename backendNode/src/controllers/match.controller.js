import Therapist from "../models/therapist.model.js";
import User from "../models/user.model.js";
import Match from "../models/match.model.js";
import { getConnectedUsers, getIo } from "../socket/socket.server.js";

export async function getTherapist(req, res) {
  try {
    if (req.role === "user") {
      const requestedTherapist = await Match.find({
        user: req.user._id,
        status: { $in: ["Pending", "Accept"] },
      }).select("therapist");

      // Get the Requested Therapist Ids
      const matchedTherapistIds = requestedTherapist.map(
        (match) => match.therapist
      );

      // Get the therapist
      const unmatchedTherapists = await Therapist.find({
        $and: [{ _id: { $nin: matchedTherapistIds } }, { availability: true }], // Those that are not selected by the user and those are available
      }).select(
        "_id name image specialization experience qualification gender rating"
      );

      return res.status(200).json({
        success: true,
        therapists: unmatchedTherapists,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    console.log(`Error in Get Therapist: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getRecommendation(req, res) {
  try {
    if (req.role === "user") {
      // Get the current User
      const currentUser = await User.findById(req.user._id);

      // Extract problem names from the user's problems array
      const problemNames = currentUser.problems.map((p) => p.problem);

      const requestedTherapist = await Match.find({
        user: req.user._id,
        status: { $in: ["Pending", "Accept"] },
      }).select("therapist");

      // Get the Requested Therapist Ids
      const matchedTherapistIds = requestedTherapist.map(
        (match) => match.therapist
      );

      // Get the therapist
      const recommended = await Therapist.find({
        $and: [
          { specialization: { $in: problemNames } },
          { _id: { $nin: matchedTherapistIds } },
          { availability: true },
        ], // That specialize in the users problems
      }).select(
        "_id name image specialization experience qualification gender rating"
      );

      return res.status(200).json({
        success: true,
        therapists: recommended,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "NOt Authorized",
      });
    }
  } catch (error) {
    console.log(`Error in Recommendation: ${error}`);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function selectTherapist(req, res) {
  try {
    // Get the selected therapist's id from the client
    const { therapistId } = req.params;

    // Check if therapistId is not null
    if (!therapistId) {
      return res.status(400).json({
        success: false,
        message: "Therapist ID is required.",
      });
    }

    // ========== Check if Therapist Exists ============
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(400).json({
        success: false,
        message: "Therapist not found.",
      });
    }

    // Get the current User's Id
    const currentUser = await User.findById(req.user._id);

    // Search for any previous requests
    const existingMatch = await Match.findOne({
      user: req.user._id,
      therapist: therapistId,
      status: { $in: ["Pending", "Accept"] },
    });

    // If the therapist is already selected or if an request exists,
    if (existingMatch) {
      return res.status(400).json({
        success: false,
        message: "Therapist is already selected or a request is pending.",
      });
    }

    // Check Total Selected Therapists and Pending Requests
    const existingMatchCount = await Match.countDocuments({
      user: req.user._id,
      status: { $in: ["Pending", "Accept"] },
    });

    // Make sure it does not exceed three
    if (existingMatchCount >= 3) {
      return res.status(400).json({
        success: false,
        message: "You cannot have connections with more than 3 therapists",
      });
    }

    // If everything is checked, create a new request and add to db
    const newMatch = new Match({
      user: req.user._id,
      therapist: therapistId,
    });
    await newMatch.save();

    // ====================================================
    // ======= Send Notification to the THERAPIST
    const connectedUsers = getConnectedUsers();
    const io = getIo();

    // Get the therapist id who was requested
    const requestingTherapistSocketId = connectedUsers.get(
      therapistId.toString()
    );

    // If they are online send a notification
    if (requestingTherapistSocketId) {
      io.to(requestingTherapistSocketId).emit("newRequest", {
        name: currentUser.name,
      });
    }

    // ========== Send Success Response ============
    res.status(200).json({
      success: true,
      message: "Therapist request created successfully.",
      user: currentUser,
    });
  } catch (error) {
    console.log(`Error in select therapist: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getPendingRequest(req, res) {
  try {
    // Get all the PENDING request from the db
    const allRequests = await Match.find({
      $or: [{ user: req.user._id }, { therapist: req.user._id }],
      status: "Pending",
    })
      .populate("user", "_id name gender image problemText")
      .populate("therapist", "_id, name image");

    res.status(200).json({
      success: true,
      pendingRequests: allRequests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getMatches(req, res) {
  try {
    if (req.role === "user") {
      // Find all matches where the logged-in user is the 'user'
      const matches = await Match.find({ user: req.user._id, status: "Accept" })
        .populate("therapist", "_id name image")
        .select("therapist");

      res.status(200).json({
        success: true,
        matches: matches.map((match) => match.therapist),
      });
    } else if (req.role === "therapist") {
      // Find all matches where the logged-in therapist is the 'therapist'
      const matches = await Match.find({
        therapist: req.user._id,
        status: "Accept",
      })
        .populate("user", "_id name image")
        .select("user");

      res.status(200).json({
        success: true,
        matches: matches.map((match) => match.user),
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role." });
    }
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching matches.",
    });
  }
}
