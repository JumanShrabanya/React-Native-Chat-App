const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.error(
        "MONGODB_URI is not defined.  Please set it in your environment or in a .env file."
      );
      process.exit(1);
    }
    console.log("Connecting to MongoDB with URI:");
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
