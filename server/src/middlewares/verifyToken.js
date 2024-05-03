const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Token is missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Continue to the protected route handler
  } catch (error) {
    // If the token is invalid or expired, return an unauthorized error
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token is invalid.", error });
  }
}

module.exports = verifyToken;
