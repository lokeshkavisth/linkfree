const express = require("express");
const registerUser = require("../controllers/auth/registerUser");
const loginUser = require("../controllers/auth/loginUser");
const refreshToken = require("../controllers/auth/refreshToken");
const verifyToken = require("../middlewares/verifyToken");
const createProfile = require("../controllers/createProfile");
const getProfile = require("../controllers/getProfile");

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Refresh token
router.post("/refresh", refreshToken);

// Protected routes
router.post("/profile", verifyToken, createProfile);
router.get("/profile/:username", getProfile);

module.exports = router;
