const program = require("commander");
const promptly = require("promptly");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminUser = require("../models/adminUsers");
const connection = require("../models/db");

// Configure commander.js
program.version("1.0.0").description("CLI tool to create a new user");

program
  .command("createUser")
  .description("Create a new user")
  .option("-a, --admin", "Create an admin user")
  .action(async (options) => {
    try {
      // Connect to the database
      await connection;

      // Avoid prompt and db connexion message collapses
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Prompt the user for input
      const username = await promptly.prompt("Enter a username: ");
      const password = await promptly.password("Enter a password: ");
      const canEdit = await promptly.confirm(
        "Can the user edit content? (y/n) ",
        {
          default: "y",
        }
      );

      // Create the user
      const user = new AdminUser({
        username,
        password,
        canEdit,
      });

      // If the admin option is passed, add admin rights to the user
      if (options.admin) {
        user.canEdit = false;
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;

      // Save the user to the database
      await user.save();
      console.log(`User ${user.username} created successfully.`);

      // Disconnect from the database
      connection.close();
    } catch (err) {
      if (err.message.toLowerCase().includes("canceled")) {
        console.log(
          "\nThe operation has been canceled.. Press Ctrl + C to exit the program."
        );
      } else {
        console.error(
          "An error occurred.. Press Ctrl + C to exit the program."
        );
      }
    }
  });

// Parse the command line arguments and execute the appropriate command
program.parse(process.argv);
