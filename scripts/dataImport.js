const program = require("commander");
const connection = require("../middlewares/db");
const fs = require("fs");
const path = require("path");

// Import the models
const CmsBlock = require("../models/cmsBlock");
const ContactInformations = require("../models/contactInformations");
const Skills = require("../models/skills");
const Tools = require("../models/tools");
const Works = require("../models/works");

program.version("1.0.0").description("CLI tool to import data from JSON file");

program
  .command("importData [filename]")
  .description("Import data from JSON file to database")
  .action(async (filename) => {
    try {
      if (!filename) {
        console.error("Please specify a filename to import");
        program.help();
      }

      const fileExtension = path.extname(filename);
      if (fileExtension !== ".json") {
        console.error("The specified file is not a JSON file.");
        program.help();
      }

      // Read the data from the JSON file
      try {
        const data = JSON.parse(
          fs.readFileSync(path.resolve(__dirname, `../data/${filename}`))
        );

        // Connect to the database
        await connection;

        // Insert CMS data if it exists
        if (data.cmsBlock) {
          await CmsBlock.insertMany(data.cmsBlock);
        }

        // Insert ContactInformations data if it exists
        if (data.contactInformations) {
          for (const contactInformation of data.contactInformations) {
            // Check if a document with the same email already exists
            const existingContactInformation =
              await ContactInformations.findOne({
                email: contactInformation.email,
              });
            // If a document with the same email already exists, skip the import of this document
            if (existingContactInformation) {
              console.warn(
                `A contact information with email "${contactInformation.email}" already exists in the database. Skipping import of this document.`
              );
              continue;
            }
            // If no document with the same email exists, insert the new document
            await ContactInformations.create(contactInformation);
          }
        }

        // Insert Skills data if it exists
        if (data.skills) {
          await Skills.insertMany(data.skills);
        }

        // Insert Tools data if it exists
        if (data.tools) {
          await Tools.insertMany(data.tools);
        }

        // Insert Works data if it exists
        if (data.works) {
          await Works.insertMany(data.works);
        }

        console.log("Data inserted successfully");
      } catch (err) {
        console.error(`Error on : ${filename} `);
        console.error("");
        console.error(err);
        program.help();
      }
    } catch (error) {
      console.error(error);
    } finally {
      // Close database connection
      connection.close();
    }
  });

program.parse(process.argv);
