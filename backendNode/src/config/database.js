import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    if (conn) console.log("Connected to the db");
  } catch (err) {
    console.log(`Error connecting to mongodb: ${err}`);
    process.exit(1);
  }
};
