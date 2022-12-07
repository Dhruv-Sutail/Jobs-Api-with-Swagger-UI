const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please Provide Company Name."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please Provide Position."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide User."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
