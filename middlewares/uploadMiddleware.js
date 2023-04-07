// uploadMiddleware.js

const multer = require("multer");
const path = require("path");
const config = require("../config/config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", config.publicFolder));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const filename = `cv_${timestamp}.pdf`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF is allowed."), false);
    }
  },
});

const uploadMiddleware = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user.canEdit) {
    return res.status(403).json({ message: "User doesn't have write access" });
  }
  upload.single("cv")(req, res, next);
};

module.exports = uploadMiddleware;
