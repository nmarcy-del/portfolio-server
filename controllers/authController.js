const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUsers");
const jwtSecret = process.env.JWT_SECRET;

// Log admin user
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AdminUser.findOne({ username: username });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: 1800,
      algorithm: "HS256",
    });

    const csrfToken = req.csrfToken();

    res.cookie("XSRF-TOKEN", csrfToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      domain: process.env.DOMAIN || "myapp.local",
      path: "/",
      maxAge: 1800,
    });

    return res.json({
      message: "Login successful",
      data: { token, csrfToken },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delog admin user
const logout = (req, res) => {
  // Remove the token cookie
  res.clearCookie("jwt");

  res.json({ message: "Logout successful" });
};

module.exports = { login, logout };
