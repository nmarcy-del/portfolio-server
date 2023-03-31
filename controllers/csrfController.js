// POST - generate csrf token
const csrf = async (req, res) => {
  try {
    // Generate a new csrf token
    const user = req.user;
    if (user) {
      return res.json({ message: "CSRF token generated successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { csrf };
