const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  managerComment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
