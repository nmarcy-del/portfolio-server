require("dotenv").config();
require("./models/db");
const express = require("express");
const passport = require("./middlewares/passport");
const corsMiddleware = require("./middlewares/cors");
const {
  csrfProtection,
  cookieParserMiddleware,
} = require("./middlewares/csrf");

const port = process.env.PORT || 5000;
const app = express();

// Allow cross-origin requests

app.use(corsMiddleware);

// Add csrf protection

app.use(cookieParserMiddleware);
app.use(csrfProtection);

// Define http response on root

app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialise passport

app.use(passport.initialize());

// Set authentification routes

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
