const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    // Generate access token and refresh token
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

    const accessToken = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "1h", // Adjust the expiration time as needed
    });

    const refreshToken = jwt.sign({ _id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    }); // // Adjust the expiration time as needed

    // Send both tokens in the response or cookies
    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "User logged in successfully",
        accessToken,
        refreshToken,
        user: { uid: user._id, username: user.username },
      });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}

module.exports = loginUser;
