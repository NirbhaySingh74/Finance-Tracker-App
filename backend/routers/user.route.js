import express from "express";
import { getUser } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

// Route to get user data
router.get("/profile", protectRoute, getUser);
export default router;
