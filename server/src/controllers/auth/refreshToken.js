const jwt = require("jsonwebtoken");

async function refreshToken(req, res) {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
    }

    // Verify refresh token
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid refresh token", err });
      }

      const userId = decoded._id;

      // Generate a new access token and refresh token
      const JWT_SECRET = process.env.JWT_SECRET;
      const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

      const newAccessToken = jwt.sign({ _id: userId }, JWT_SECRET, {
        expiresIn: "1h", // Adjust the expiration time as needed
      });

      const newRefreshToken = jwt.sign({ _id: userId }, JWT_REFRESH_SECRET, {
        expiresIn: "7d", // Adjust the expiration time as needed
      });

      return res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

module.exports = refreshToken;
