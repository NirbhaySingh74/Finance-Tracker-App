import express from "express";
import { financeController } from "../controllers/finance.controller.js";

const router = express.Router();

router.post("/add", financeController);

export default router;
