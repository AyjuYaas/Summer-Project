import bcrypt from "bcryptjs";
import validatePassword from "../middleware/password.middle.js";
import Admin from "../models/admin.model.js";
import Therapist from "../models/therapist.model.js";

export const getPendingTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({
      validationStatus: "pending",
    }).select("_id name email image validationStatus");

    return res.status(200).json({
      success: true,
      therapists,
    });
  } catch (error) {
    console.log("Error in getPendingTherapists:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getApprovedTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find({
      validationStatus: "approved",
    }).select("_id name email image validationStatus");

    return res.status(200).json({
      success: true,
      therapists,
    });
  } catch (error) {
    console.log("Error in getApprovedTherapists:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getIndividualTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;

    const therapist = await Therapist.findById(therapistId).select(
      "_id name email image phone gender languages specialization experience qualification validationStatus createdAt"
    );

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "No therapist found",
      });
    }

    return res.status(200).json({
      success: true,
      therapist,
    });
  } catch (error) {
    console.log("Error at Individual therapist controller-admin: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const respondTherapist = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const { status } = req.body;

    const therapist = await Therapist.findById(therapistId);

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    let message = "";
    if (status === "approve") {
      therapist.validationStatus = "approved";
      message = "Therapist approved successfully";
    } else if (status === "reject") {
      therapist.validationStatus = "rejected";
      message = "Therapist rejected successfully";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    await therapist.save();
    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.log("Error in respondTherapist:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getTherapistValidationStats = async (req, res) => {
  try {
    const result = await Therapist.aggregate([
      {
        $group: {
          _id: "$validationStatus",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          statuses: {
            $push: {
              status: "$_id",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          percentages: {
            $map: {
              input: "$statuses",
              as: "status",
              in: {
                status: "$$status.status",
                percent: {
                  $round: [
                    {
                      $multiply: [
                        { $divide: ["$$status.count", "$total"] },
                        100,
                      ],
                    },
                    2,
                  ],
                },
              },
            },
          },
        },
      },
    ]);

    // Sort manually before sending
    const ordered = ["approved", "pending", "rejected"];
    const sorted = (result[0]?.percentages || []).sort(
      (a, b) => ordered.indexOf(a.status) - ordered.indexOf(b.status)
    );

    res.status(200).json(sorted);
  } catch (error) {
    console.log(
      "Error in GetTherapistValidationStats--Admin Controller: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { newPassword, ...updatedData } = req.body;

    if (!updatedData.name || !updatedData.email || !updatedData.oldPassword) {
      return res.status(400).json({
        success: false,
        message: "The fields marked * are all required",
      });
    }

    const admin = await Admin.findById(req.user);

    if (!(await admin.matchPassword(updatedData.oldPassword))) {
      return res.status(400).json({
        success: false,
        message: "Your existing password is incorrect",
      });
    }

    if (newPassword) {
      const passwordValidation = validatePassword(newPassword);
      if (await admin.matchPassword(newPassword)) {
        return res.status(400).json({
          success: false,
          message: "New password must be different from the current password",
        });
      }

      if (!passwordValidation.isValid) {
        return res.status(400).json({
          success: false,
          message: passwordValidation.errors.join(", "),
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updatedData.password = hashedPassword;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(admin._id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      user: {
        _id: updatedAdmin._id,
        name: updatedAdmin.name,
        email: updatedAdmin.email,
      },
    });
  } catch (error) {
    console.log(
      "Error in GetTherapistValidationStats--Admin Controller: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
