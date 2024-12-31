const jwt = require("jsonwebtoken");

const validateShareSpaceToken = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { spaceId, access } = decoded;
    if (!spaceId || !access) {
      return res.status(400).json({
        error: true,
        message: "Invalid token: Missing required claims",
      });
    }

    req.spaceId = decoded.spaceId;
    req.access = decoded.access;
    next();
  } catch (error) {
    console.log("error retrieving token data", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          error: true,
          message: "Token has expired. Please request a new link.",
        });
    }

    return res
      .status(401)
      .json({ error: true, message: "Invalid or malformed token." });
  }
};

module.exports = validateShareSpaceToken;
