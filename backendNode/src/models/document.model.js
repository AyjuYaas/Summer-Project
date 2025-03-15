import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderType",
    },
    senderType: {
      type: String,
      enum: ["User", "Therapist"],
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverType",
    },
    receiverType: {
      type: String,
      enum: ["User", "Therapist"],
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    fileName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
