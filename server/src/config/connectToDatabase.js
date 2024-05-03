const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    const URI = process.env.MONGODB_URI;

    await mongoose.connect(URI);

    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

module.exports = connectToDatabase;
