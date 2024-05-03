const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
    minlength: [3, "Username must be at least 3 characters long."],
    maxlenth: [20, "Username cannot be longer than 20 characters."],
    match: [
      /^[a-zA-Z0-9_\.]+$/,
      "Username can only contain letters, numbers, dots and underscores.",
    ],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
    index: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Password must be at least 8 characters long."],
    maxlenth: [20, "Password cannot be longer than 20 characters."],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
    ],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);

// This schema defines user credentials with username and password fields. The pre('save') hook securely hashes the password before saving the user object.
