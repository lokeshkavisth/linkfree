const User = require("../../models/User");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUserWithUsername = await User.findOne({ username });
    const existingUserWithEmail = await User.findOne({ email });

    if (existingUserWithUsername || existingUserWithEmail) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already exists with this email or username",
        });
    }

    const newUser = await User.create({ username, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        uid: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}

module.exports = registerUser;
