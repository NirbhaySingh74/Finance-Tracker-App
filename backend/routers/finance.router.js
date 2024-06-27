import express from "express";
import {
  addFinanceData,
  getFinanceData,
} from "../controllers/finance.controller.js";
import protectRoute from "../middleware.js/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addFinanceData);
router.get("/", protectRoute, getFinanceData);
export default router;
