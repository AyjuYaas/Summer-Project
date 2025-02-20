import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
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
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
