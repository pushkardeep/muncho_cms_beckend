import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("DB connected successfully");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};
