const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["employee", "manager"],
    required: true
  },

  leaveBalance: {
    vacation: { type: Number, default: 36 },
    sick: { type: Number, default: 12 }
  }
});

module.exports = mongoose.model("User", userSchema);
