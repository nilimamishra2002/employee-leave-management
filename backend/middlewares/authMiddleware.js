exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};

exports.isManager = (req, res, next) => {
  if (req.user.role === "manager") return next();
  res.status(403).json({ message: "Access denied" });
};
