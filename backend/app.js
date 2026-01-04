const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();
const path = require("path");

// DB connection
connectDB();

// middleware
app.use(express.json());
// app.use(cors({
//   origin: "https://employee-leave-management-dashboard.onrender.com",
//   credentials: true
// }));
app.use(cors());


app.set("trust proxy", 1);


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure: true,
    sameSite: "lax"
  }
}));



// passport config
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.send("Employee Leave Management API");
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
