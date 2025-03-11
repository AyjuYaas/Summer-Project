import Therapist from "../models/therapist.model.js";
import User from "../models/user.model.js";
import Request from "../models/request.model.js";
import {
  getConnectedUsers,
  getIo,
  getOnlineUsers,
} from "../socket/socket.server.js";

export async function getTherapist(req, res) {
  try {
    // Get the user
    const currentUser = await User.findById(req.user._id);
    // Get the therapist
    const therapists = await Therapist.find({
      $and: [
        { _id: { $nin: currentUser.selected_therapists } },
        { availability: true },
      ], // Those that are not selected by the user and those are available
    }).select(
      "_id name image specialization experience qualification gender rating"
    );

    res.status(200).json({
      success: true,
      therapists: therapists,
    });
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
    // Get the current User
    const currentUser = await User.findById(req.user._id);

    // Extract problem names from the user's problems array
    const problemNames = currentUser.problems.map((p) => p.problem);

    // Get the therapist
    const recommended = await Therapist.find({
      $and: [
        { specialization: { $in: problemNames } },
        { _id: { $nin: currentUser.selected_therapists } },
        { availability: true },
      ], // That specialize in the users problems
    }).select(
      "_id name image specialization experience qualification gender rating"
    );

    res.status(200).json({
      success: true,
      therapists: recommended,
    });
    //
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
    const existingRequest = await Request.findOne({
      user: req.user._id,
      therapist: therapistId,
    });

    // If the therapist is already selected or if an request exists,
    if (
      currentUser.selected_therapists.includes(therapistId) ||
      existingRequest
    ) {
      return res.status(400).json({
        success: false,
        message: "Therapist is already selected or a request is pending.",
      });
    }

    // Check Total Selected Therapists and Pending Requests
    const selectedTherapistsCount = currentUser.selected_therapists.length;
    const pendingRequestsCount = await Request.countDocuments({
      user: req.user._id,
      status: "Pending",
    });

    // Make sure it does not exceed three
    if (selectedTherapistsCount + pendingRequestsCount >= 3) {
      return res.status(400).json({
        success: false,
        message: "You cannot have connections with more than 3 therapists",
      });
    }

    // If everything is checked, create a new request and add to db
    const newRequest = new Request({
      user: req.user._id,
      therapist: therapistId,
    });
    await newRequest.save();

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
    const allRequests = await Request.find({
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
      const user = await User.findById(req.user._id).populate(
        "selected_therapists",
        "_id name image"
      );

      res.status(200).json({
        success: true,
        matches: user.selected_therapists,
      });
    } else {
      const therapist = await Therapist.findById(req.user._id).populate(
        "matched_user",
        "_id name image"
      );
      res.status(200).json({
        success: true,
        matches: therapist.matched_user,
      });
    }
  } catch (error) {
    console.log(`Error in getTherapist ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
