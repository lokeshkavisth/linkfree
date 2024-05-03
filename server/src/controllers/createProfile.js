const Profile = require("../models/Profile");

async function createProfile(req, res) {
  try {
    const userProfile = await Profile.create(req.body);

    if (!userProfile) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating profile" });
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
