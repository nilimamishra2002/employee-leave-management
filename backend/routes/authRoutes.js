const express = require("express");
const passport = require("passport");
const { register, logout } = require("../controllers/authController");

const router = express.Router();

/**
 * Register user
 */
router.post("/register", register);

/**
 * Login user (passport local)
 */
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  next();
}, passport.authenticate("local"), (req, res) => {
  const user = req.user;

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      leaveBalance: user.leaveBalance
    }
  });
});



/**
 * Logout user
 */
router.post("/logout", logout);

module.exports = router;
