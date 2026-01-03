const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password, and role are required"
      });
    }

    if (!["employee", "manager"].includes(role)) {
      return res.status(400).json({
        message: "Role must be either employee or manager"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: "Registration failed"
    });
  }
};


exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully" });
  });
};
