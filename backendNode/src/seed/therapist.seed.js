import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import qualificationData from "./data/qualification-data.js";
import languages from "./data/language.data.js";
import specializations from "./data/specializations-data.js";
import genders from "./data/gender-data.js";
import Therapist from "../models/therapist.model.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/TheraFind";

console.log("Mongo URI:", MONGO_URI);
//   || "mongodb://localhost:27017/your-db-name
// Flatten qualifications
const qualifications = qualificationData.flatMap((cat) =>
  cat.items.map((item) => item.value)
);

function getRandomSubset(array, min = 1, max = 3) {
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  return [...array].sort(() => 0.5 - Math.random()).slice(0, size);
}

async function seedTherapists(count = 50) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const passwordHash = await bcrypt.hash("helloworld", 10);

    const therapists = Array.from({ length: count }, (_, i) => ({
      name: `Therapist ${i + 1}`,
      email: `therapist${i + 1}@example.com`,
      password: passwordHash,
      phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      languages: getRandomSubset(languages, 1, 3),
      specialization: getRandomSubset(specializations, 1, 2),
      experience: Math.floor(Math.random() * 21),
      qualification: getRandomSubset(qualifications, 1, 4),
    }));

    await Therapist.insertMany(therapists);
    console.log(`🎉 Inserted ${count} therapists.`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedTherapists(50);
