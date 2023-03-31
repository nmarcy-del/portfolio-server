const crypto = require("crypto");
const config = require("../config/config");
const csrfModel = require("../models/usersCsrf");

const csrfMiddleware = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next();
  }

  let csrfToken = await csrfModel.findOne({ user: user._id });

  // Use existing token if it exists and hasn't expired
  if (csrfToken && csrfToken.expiresAt >= Date.now()) {
    res.cookie("csrfToken", csrfToken.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      domain: config.domain || "myapp.local",
      path: "/",
      expires: csrfToken.expiresAt,
    });
    req.csrfToken = csrfToken.token;
    return next();
  }

  // Generate a new token if no token exists or if the token has expired
  const secretKey = crypto.randomBytes(32).toString("hex");
  const hmac = crypto.createHmac("sha256", secretKey);
  csrfToken = await csrfModel.findOneAndUpdate(
    { user: user._id },
    {
      token: hmac.digest("hex"),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    },
    { upsert: true, new: true }
  );

  res.cookie("csrfToken", csrfToken.token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    domain: config.domain || "myapp.local",
    path: "/",
    expires: csrfToken.expiresAt,
  });

  req.csrfToken = csrfToken.token;
  next();
};

const verifyCsrfMiddleware = async (req, res, next) => {
  // Exclude authentication routes and GET requests
  if (
    req.path.startsWith("/auth") ||
    req.path.startsWith("/csrf") ||
    req.method === "GET"
  ) {
    return next();
  }

  const csrfToken = req.cookies.csrfToken;
  if (!csrfToken) {
    return res.status(403).send("Invalid CSRF token");
  }
  const user = req.user;

  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  const storedCsrfToken = await csrfModel.findOne({ user: user._id });
  if (!storedCsrfToken || storedCsrfToken.token !== csrfToken) {
    return res.status(403).send("Invalid CSRF token");
  }

  req.csrfToken = storedCsrfToken.token;
  next();
};

module.exports = { csrfMiddleware, verifyCsrfMiddleware };
