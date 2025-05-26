import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const therapistSchema = new mongoose.Schema(
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
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dfotn4ovh/image/upload/v1740918491/default-profile_e206nk.jpg",
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    languages: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    specialization: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    experience: {
      type: Number,
      require: true,
      min: 0,
    },
    qualification: [
      {
        type: String,
        required: true,
      },
    ],
    availability: {
      type: Boolean,
      default: true,
    },
    validationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Before saving to database, hash the password
therapistSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create a method to match password
therapistSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Therapist = mongoose.model("Therapist", therapistSchema);

export default Therapist;
