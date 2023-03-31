const mongoose = require("mongoose");

// Check if endDate is not earlier than startDate
const isValidDateRange = (startDateString, endDateString) => {
  const startDate = new Date(startDateString);
  const endDate = endDateString ? new Date(endDateString) : null;
  return !endDate || endDate.getTime() >= startDate.getTime();
};

const worksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  place: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  technologies: {
    type: String,
    required: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
    validate: {
      validator: function (endDate) {
        return !!endDate || isValidDateRange(this.startDate, endDate);
      },
      message: "End date is earlier than start date",
    },
  },
});

const Works = mongoose.model("Works", worksSchema);

module.exports = Works;
