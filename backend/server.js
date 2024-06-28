import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routers/auth.routes.js";
import financeRouter from "./routers/finance.router.js";
import userRoutes from "./routers/user.route.js";
import passport from "./utils/googleAuth.js";
// Initialize dotenv to use environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log("Mongodb connection error", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/finance", financeRouter);
app.use("/api/user", userRoutes);

// Google OAuth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/financeDashboard");
  }
);
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
