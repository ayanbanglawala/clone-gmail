const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ayanbanglawala2278:ayan8722@ayanb.zb6n9.mongodb.net/gmail_clone",
      {
        serverSelectionTimeoutMS: 5000, // Adjust timeout to handle delays
      }
    );
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error: ", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
