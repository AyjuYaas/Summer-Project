import Therapist from "../models/therapist.model.js";
import User from "../models/user.model.js";
import Match from "../models/match.model.js";
import { getConnectedUsers, getIo } from "../socket/socket.server.js";
import Review from "../models/review.model.js";
import Preference from "../models/userPreferences.model.js";
import {
  qualificationWeights,
  scoringWeights,
} from "../config/weights.config.js";
import { buildTherapistAggregation } from "../utils/therapistAggregator.js";

export async function getTherapist(req, res) {
  try {
    const { page = 1, specialization, gender, language } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;

    if (req.role !== "user") {
      return res.status(400).json({
        success: false,
        message: "Not Authorized",
      });
    }

    // Get already requested therapist IDs
    const requestedTherapist = await Match.find({
      user: req.user._id,
      status: { $in: ["Pending", "Accept"] },
    }).select("therapist");

    const matchedTherapistIds = requestedTherapist.map(
      (match) => match.therapist
    );

    // Base filters
    const filters = {
      _id: { $nin: matchedTherapistIds },
      availability: true,
      validationStatus: "approved",
    };

    // Apply specialization filter (supports comma-separated values)
    if (specialization) {
      const specializationArray = specialization.split(",");
      filters.specialization = { $in: specializationArray };
    }

    // Apply gender filter
    if (gender) {
      filters.gender = gender;
    }

    // Apply language filter (single value for now)
    if (language) {
      filters.languages = language;
    }

    const therapists = await Therapist.find(filters)
      .select(
        "_id name image specialization experience qualification gender rating reviewCount languages totalMatches"
      )
      .skip(skip)
      .limit(limit)
      .sort({ experience: -1, rating: -1 });

    const totalTherapists = await Therapist.countDocuments(filters);
    const totalPages = Math.ceil(totalTherapists / limit);
    const hasMore = page < totalPages;

    return res.status(200).json({
      success: true,
      therapists,
      hasMore,
    });
  } catch (error) {
    console.error("Error in Get Therapist:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export const getRecommendation = async (req, res) => {
  try {
    const userId = req.user._id;
    const preference = await Preference.findOne({ user: userId });

    if (!preference) {
      return res
        .status(404)
        .json({ success: false, message: "Preference not found." });
    }

    const requestedTherapist = await Match.find({
      user: userId,
      status: { $in: ["Pending", "Accept"] },
    }).select("therapist");

    const matchedTherapistIds = requestedTherapist.map(
      (match) => match.therapist
    );

    const { preferredGender, preferredLanguage, predictedProblems } =
      preference;
    const predictedProblemList = predictedProblems.map(
      ({ problem }) => problem
    );

    // Aggregation query
    const aggregationPipeline = buildTherapistAggregation({
      matchedTherapistIds,
      preferredLanguage,
      preferredGender,
      predictedProblemList,
      scoringWeights,
    });

    const therapistResults = await Therapist.aggregate(aggregationPipeline);

    // Optionally: add qualification weight in Node.js
    const recommendations = therapistResults.map((therapist) => {
      let score = therapist.totalScore;

      therapist.qualification?.forEach((q) => {
        score += qualificationWeights[q] || 0;
      });

      return { therapist, score };
    });

    const sortedRecommendations = recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ therapist, score }) => ({
        _id: therapist._id,
        name: therapist.name,
        image: therapist.image,
        specialization: therapist.specialization,
        experience: therapist.experience,
        qualification: therapist.qualification,
        gender: therapist.gender,
        rating: therapist.rating,
        reviewCount: therapist.reviewCount,
        totalMatches: therapist.totalMatches,
        languages: therapist.languages,
        score: parseFloat(score.toFixed(2)),
      }));

    res.status(200).json({ success: true, therapists: sortedRecommendations });
  } catch (error) {
    console.error("Error in recommendation system:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

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
      .populate("user", "_id name gender image")
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

export async function getUserPreference(req, res) {
  try {
    const { userId } = req.params;
    const preference = await Preference.findOne({ user: userId });
    if (!preference) {
      return res.status(404).json({
        success: false,
        message: "Preference not found.",
      });
    }

    res.status(200).json({
      success: true,
      preference: {
        preferredGender: preference.preferredGender,
        preferredLanguage: preference.preferredLanguage,
        problemText: preference.problemText,
        predictedProblems: preference.predictedProblems,
      },
    });
  } catch (error) {
    console.error("Error fetching user preference:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user preference.",
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

export async function getReviews(req, res) {
  try {
    const { therapistId } = req.params;

    if (!therapistId) {
      return res.status(400).json({
        success: false,
        message: "No therapist Id",
      });
    }

    const reviews = await Review.find({
      therapist: therapistId,
    }).populate({
      path: "user",
      select: "name image",
    });

    res.status(200).json({
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    console.log("Error in get Reviews in match controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
