import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import connectDB from "./config/database.js"; // Import the database connection
import { User } from "./models/user.model.js";
import authRoutes from "./routers/auth.routes.js";
import financeRouter from "./routers/finance.router.js";
import userRoutes from "./routers/user.route.js";
import bcrypt from "bcryptjs";
// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Updated to 5000 for the backend server

// Middleware for handling CORS
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware for parsing JSON bodies and cookies
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

// Initialize session middleware for Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ensure the cookie is only used over HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
connectDB();

// Passport Google Strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile);
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const placeholderPassword = bcrypt.hashSync(
            "placeholderPassword",
            10
          ); // Generate a hashed placeholder password
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
            password: placeholderPassword,
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Initial Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/financeDashboard",
    failureRedirect: "http://localhost:3001/login",
  })
);

// Login success route
app.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "User logged in", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

// Logout route
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3001");
  });
});

// Routes
app.use("/api", authRoutes); // Ensure API routes are prefixed with /api
app.use("/api/finance", financeRouter);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

export default app;
