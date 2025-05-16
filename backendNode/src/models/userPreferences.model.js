import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    preferredGender: {
      type: String,
      enum: ["Male", "Female", "Other", "Any"],
      default: "Any",
    },
    preferredLanguage: {
      type: String,
      default: "English",
    },
    problemText: { type: String, default: "" },
    predictedProblems: [
      {
        problem: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Preference = mongoose.model("Preference", preferenceSchema);

export default Preference;
