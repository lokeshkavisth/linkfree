const Profile = require("../models/Profile");

async function getProfile(req, res) {
  try {
    const { username } = req.params;

    if (!username || typeof username !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid username" });
    }

    const userProfile = await Profile.findOne({ username });

    if (!userProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Profile found", userProfile });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}
module.exports = getProfile;
