import { FinanceModel } from "../models/finance.model.js";

export const addFinanceData = async (req, res) => {
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
    console.log("Add finance controller error", error.message);
    return res.status(500).json(error.message);
  }
};

export const getFinanceData = async (req, res) => {
  try {
    const records = await FinanceModel.find();
    // console.log(records);
    res.json(records);
  } catch (error) {
    console.log("Get finance controller error", error.message);
    return res.status(500).json(error.message);
  }
};
