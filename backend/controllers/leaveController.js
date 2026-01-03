const LeaveRequest = require("../models/LeaveRequest");
const User = require("../models/User");

/**
 * Employee applies for leave
 */
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    // basic validation
    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const leave = new LeaveRequest({
      employee: req.user._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await leave.save();
    res.json({ message: "Leave request submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * Employee views their own leave requests
 */
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ employee: req.user._id })
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaves" });
  }
};

/**
 * Manager views all pending leave requests
 */
exports.getPendingLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find({ status: "pending" })
      .populate("employee", "name email");

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending leaves" });
  }
};

/**
 * Manager approves leave and updates balance
 */
exports.approveLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id).populate("employee");

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Leave already processed" });
    }

    // calculate number of leave days
    const start = new Date(leave.startDate);
    const end = new Date(leave.endDate);
    const days =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const user = leave.employee;

    // check leave balance
    if (user.leaveBalance[leave.leaveType] < days) {
      return res.status(400).json({ message: "Insufficient leave balance" });
    }

    // deduct balance
    user.leaveBalance[leave.leaveType] -= days;
    await user.save();

    // update leave status
    leave.status = "approved";
    leave.managerComment = req.body.comment || "";
    await leave.save();

    res.json({ message: "Leave approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error approving leave" });
  }
};

/**
 * Manager rejects leave
 */
exports.rejectLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Leave already processed" });
    }

    leave.status = "rejected";
    leave.managerComment = req.body.comment || "";
    await leave.save();

    res.json({ message: "Leave rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting leave" });
  }
};
