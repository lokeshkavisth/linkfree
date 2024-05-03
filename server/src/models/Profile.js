const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    index: true,
    minlength: [3, "Username must be at least 3 characters long."],
    maxlenth: [20, "Username cannot be longer than 20 characters."],
    match: [
      /^[a-zA-Z0-9_\.]+$/,
      "Username can only contain letters, numbers, dots and underscores.",
    ],
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Display name must be at least 3 characters long."],
    maxlenth: [30, "Display name cannot be longer than 30 characters."],
  },
  bio: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Bio must be at least 3 characters long."],
    maxlenth: [150, "Bio cannot be longer than 200 characters."],
  },
  avatar: {
    type: String,
    trim: true,
    required: true,
  },
  links: [
    {
      title: {
        type: String,
        trim: true,
        required: true,
      },
      url: {
        type: String,
        trim: true,
        required: true,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          "Invalid URL",
        ],
      },
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
