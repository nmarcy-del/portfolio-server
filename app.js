require("dotenv").config();
require("./models/db");
const express = require("express");
const passport = require("./middlewares/passport");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

// Allow cross-origin requests

const whitelist = process.env.CORS_WHITELIST
  ? process.env.CORS_WHITELIST.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      whitelist.indexOf("*") !== -1 ||
      whitelist.indexOf(origin) !== -1 ||
      !origin
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Define http response on root

app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Passport

app.use(passport.initialize()); // Initialise passport

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// List of api routes for the app

const worksRoutes = require("./routes/worksRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const contactInformationsRoutes = require("./routes/contactInformationsRoutes");
const cmsRoutes = require("./routes/cmsRoutes");

// Protected routes
app.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  worksRoutes,
  skillsRoutes,
  toolsRoutes,
  contactInformationsRoutes,
  cmsRoutes
);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
