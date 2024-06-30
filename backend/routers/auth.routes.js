import express from "express";
import passport from "passport";
import {
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/signup", userSignup);
router.post("/api/login", userLogin);
router.post("/api/logout", userLogout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_SUCCESS_REDIRECT_URL,
    failureRedirect: process.env.CLIENT_FAILURE_REDIRECT_URL,
  })
);

export default router;
