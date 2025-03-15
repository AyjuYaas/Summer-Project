import mongoose from "mongoose";

const matchesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
    },
    status: {
      type: String,
      enum: ["Accept", "Declined", "Pending", "Removed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Match = mongoose.model("Match", matchesSchema);

export default Match;
