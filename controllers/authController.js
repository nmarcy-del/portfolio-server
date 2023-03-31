const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUsers");
const config = require("../config/config");
const jwtSecret = config.jwtSecret;

// Log admin user
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AdminUser.findOne({ username: username });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create jwt token, set expiration at 1800 seconde (30 minutes)
    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: 1800,
      algorithm: "HS256",
    });

    return res.json({
      message: "Login successful",
      token: { token },
      username: username,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout admin user
const logout = async (req, res) => {
  try {
    // Remove the csrf token cookie
    res.clearCookie("csrfToken", {
      hostOnly: false,
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      domain: `.${config.domain}`,
      path: "/",
      maxAge: 0,
    });
    return res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, logout };
