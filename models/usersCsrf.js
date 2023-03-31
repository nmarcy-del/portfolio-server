const mongoose = require("mongoose");

const usersCsrfSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser" },
  token: String,
  createdAt: Date,
  expiresAt: Date,
});

const usersCsrfToken = mongoose.model("usersCsrfToken", usersCsrfSchema);

module.exports = usersCsrfToken;
