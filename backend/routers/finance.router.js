import express from "express";
import {
  addFinanceData,
  getFinanceData,
} from "../controllers/finance.controller.js";

const router = express.Router();

router.post("/add", addFinanceData);
router.get("/", getFinanceData);
export default router;
