import express from "express";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Auth routes for signup, login, and logout
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", userLogout);

// Route to initiate Google OAuth
// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// Route to handle Google OAuth callback
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/api/financeDashboard", // Update to the correct path after successful login
//     failureRedirect: "/login",
//   })
// );

export default router;
