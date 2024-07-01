import express from "express";
import passport from "passport";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/auth/signup", userSignup);
router.post("/api/auth/login", userLogin);
router.post("/api/auth/logout", userLogout);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }), // Disable session
  (req, res) => {
    // Generate a token and set the cookie
    generateTokenAndSetCookie(req.user.id, res);

    // Redirect to the success URL
    res.redirect(process.env.CLIENT_SUCCESS_REDIRECT_URL);
  }
);

export default router;
