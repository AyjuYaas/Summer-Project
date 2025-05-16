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
    birthDate: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
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
  },
  { timestamps: true }
);

// Before saving the user to db, hash the password and call the next function
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create a custom method to match the password for authentication
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.virtual("age").get(function () {
  const birthDate = new Date(this.birthDate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
});

const User = mongoose.model("User", userSchema);

export default User;
