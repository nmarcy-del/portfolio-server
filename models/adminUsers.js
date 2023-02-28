const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminUsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  canEdit: Boolean,
});

adminUsersSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

adminUsersSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

module.exports = mongoose.model("AdminUser", adminUsersSchema);
