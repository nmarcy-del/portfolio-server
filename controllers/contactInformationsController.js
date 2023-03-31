const ContactInformations = require("../models/contactInformations");

// GET - Get all contact informations
const getAllContactInformations = async (req, res) => {
  try {
    const contactInformations = await ContactInformations.find();
    res.json(contactInformations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get a contact information by ID
const getContactInformationById = async (req, res) => {
  try {
    const contactInformation = await ContactInformations.findById(
      req.params.id
    );
    if (!contactInformation) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(contactInformation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET - Get a contact information by addressName
const getContactInformationByAddressName = async (req, res) => {
  try {
    const contactInformation = await ContactInformations.findOne({
      addressName: req.params.addressName,
    });
    if (!contactInformation) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(contactInformation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create a new contact information
const createContactInformation = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const contactInformation = new ContactInformations(req.body);
  try {
    await contactInformation.save();
    res.status(201).json(contactInformation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Update a contact information by ID
const updateContactInformation = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const contactInformation = await ContactInformations.findById(
      req.params.id
    );
    if (!contactInformation) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    Object.assign(contactInformation, req.body);
    await contactInformation.save();
    res.json(contactInformation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete a contact information by ID
const deleteContactInformation = async (req, res) => {
  const user = req.user;
  if (!user || !user.canEdit) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const contactInformation = await ContactInformations.findById(
      req.params.id
    );
    if (!contactInformation) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    await contactInformation.remove();
    res.json({ message: "Contact information deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createContactInformation,
  getAllContactInformations,
  getContactInformationById,
  getContactInformationByAddressName,
  updateContactInformation,
  deleteContactInformation,
};
