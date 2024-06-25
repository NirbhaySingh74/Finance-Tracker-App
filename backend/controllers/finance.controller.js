import { FinanceModel } from "../models/finance.model.js";

export const financeController = async (req, res) => {
  try {
    const { description, amount, category, paymentMethod } = req.body;

    if (!description || !amount || !category || !paymentMethod) {
      return res.json({ error: "All fields are required" });
    }

    const newField = new FinanceModel({
      description,
      amount,
      category,
      paymentMethod,
    });
    await newField.save();
    res.status(200).json(newField);
  } catch (error) {
    console.log("finance controller error", error.message);
    return res.status(500).json(error.message);
  }
};
