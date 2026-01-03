const express = require("express");
const {
  applyLeave,
  getMyLeaves,
  getPendingLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/leaveController");

const {
  isAuthenticated,
  isManager
} = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * Employee routes
 */
router.post("/apply", isAuthenticated, applyLeave);
router.get("/my", isAuthenticated, getMyLeaves);

/**
 * Manager routes
 */
router.get("/pending", isAuthenticated, isManager, getPendingLeaves);
router.put("/:id/approve", isAuthenticated, isManager, approveLeave);
router.put("/:id/reject", isAuthenticated, isManager, rejectLeave);

module.exports = router;
