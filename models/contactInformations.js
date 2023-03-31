const mongoose = require("mongoose");
const validator = require("validator");

const contactInformationSchema = new mongoose.Schema({
  addressName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  addressL1: {
    type: String,
    required: true,
  },
  addressL2: {
    type: String,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: "Email is not valid",
    },
  },
  linkedin: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === "") {
          return true;
        }
        return validator.isURL(value);
      },
      message: "{VALUE} is not a valid URL",
    },
  },
  github: {
    type: String,
    validate: {
      validator: (value) => {
        if (value === "") {
          return true;
        }
        return validator.isURL(value);
      },
      message: "{VALUE} is not a valid URL",
    },
  },
});

const ContactInformations = mongoose.model(
  "ContactInformations",
  contactInformationSchema
);

module.exports = ContactInformations;
