import Therapist from "../models/therapist.model.js";
import User from "../models/user.model.js";

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
    }).select("name image rating experience specialization");

    res.status(200).json({
      success: true,
      therapists: therapists,
    });
    //
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
    const currentUser = await User.findById(req.user._id);

    // Get the therapist
    const recommended = await Therapist.find({
      $and: [
        { specialization: { $in: Object.keys(currentUser.problems) } },
        { _id: { $nin: currentUser.selected_therapists } },
        { availability: true },
      ], // That specialize in the users problems
    }).select("name image specialization rating");

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
    const { therapistId } = req.params;
    const currentUser = await User.findById(req.user._id);
    const selectedTherapist = await Therapist.findById(therapistId);

    if (!currentUser.selected_therapists.includes(therapistId)) {
      currentUser.selected_therapists.push(therapistId);
      selectedTherapist.matched_user.push(currentUser._id);

      await Promise.all([
        await currentUser.save(),
        await selectedTherapist.save(),
      ]);
    }

    res.status(200).json({
      success: true,
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

export async function getMatches(req, res) {
  try {
    const user = await User.findById(req.user._id).populate(
      "selected_therapists",
      "name image"
    );

    res.status(200).json({
      success: true,
      select_therapists: user.selected_therapists,
    });
  } catch (error) {
    console.log(`Error in getTherapist ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
