import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Create a user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 10,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dfotn4ovh/image/upload/v1739808245/TheraFind/vdyzkxfy0oqyam37fozm.jpg",
    },
    problems: [{ type: String, trim: true }],
    selected_therapists: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Therapist" },
    ],
  },
  { timestamps: true }
);

// Before saving the user to db, hash the password and call the next function
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create a custom method to match the password for authentication
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
