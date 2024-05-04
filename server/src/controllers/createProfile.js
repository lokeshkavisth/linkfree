const Profile = require("../models/Profile");

async function createProfile(req, res) {
  try {
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid profile data" });
    }

    const existingProfile = await Profile.findOne({
      username: req.body.username,
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile already exists" });
    }

    const userProfile = await Profile.create(req.body);

    if (!userProfile) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create profile" });
    }

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile: {
        uid: userProfile._id,
        username: userProfile.username,
      },
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}
module.exports = createProfile;
