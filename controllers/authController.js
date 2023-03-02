const jwt = require("jsonwebtoken");
const AdminUser = require("../models/adminUsers");
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AdminUser.findOne({ username: username });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, {
      expiresIn: 3600,
      algorithm: "HS256",
    });

    // Store the token in a secure cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("XSRF-TOKEN", req.csrfToken(), {
      secure: true,
      sameSite: "strict",
    });

    return res.json({ message: "Login successful", data: { token } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  // Remove the token cookie and CSRF cookie
  res.clearCookie("jwt");
  res.clearCookie("XSRF-TOKEN");

  res.json({ message: "Logout successful" });
};

module.exports = { login, logout };
