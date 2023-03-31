const express = require("express");
const router = express.Router();
const contactInformationsController = require("../controllers/contactInformationsController");

// GET - Get contact informations
router.get(
  "/contacts",
  contactInformationsController.getAllContactInformations
);

// GET - Get contact information by id
router.get(
  "/contacts/:id",
  contactInformationsController.getContactInformationById
);

// GET - Get contact information by addressName
router.get(
  "/contacts/addressName/:addressName",
  contactInformationsController.getContactInformationByAddressName
);

// POST - Create contact information
router.post(
  "/contacts",
  contactInformationsController.createContactInformation
);

// PUT - Modify contact information
router.put(
  "/contacts/:id",
  contactInformationsController.updateContactInformation
);

// DELETE - Delete contact information
router.delete(
  "/contacts/:id",
  contactInformationsController.deleteContactInformation
);

module.exports = router;
