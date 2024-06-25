import express from "express";
import { userSignup } from "../controllers/auth.controller.js";

const router = express.Router();

//auth router for signup login and logout
router.post("/signup", userSignup);

export default router;
