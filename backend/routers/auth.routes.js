import express from "express";
import { userLogin, userSignup } from "../controllers/auth.controller.js";

const router = express.Router();

//auth router for signup login and logout
router.post("/signup", userSignup);
router.post("/login", userLogin);
export default router;
