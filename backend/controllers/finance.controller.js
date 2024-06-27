import { FinanceModel } from "../models/finance.model.js";

export const addFinanceData = async (req, res) => {
  try {
    const { description, amount, category, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!description || !amount || !category || !paymentMethod) {
      return res.json({ error: "All fields are required" });
    }

    const newField = new FinanceModel({
      description,
      amount,
      category,
      paymentMethod,
      user: userId,
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
    const userId = req.user._id;
    const financeData = await FinanceModel.find({ user: userId });
    res.status(200).json(financeData);
  } catch (error) {
    console.log("Get finance controller error", error.message);
    return res.status(500).json(error.message);
  }
};

export const deleteFinanceData = async (req, res) => {
  try {
    const financeId = req.params.id;
    const userId = req.user._id;

    const financeData = await FinanceModel.findOneAndDelete({
      _id: financeId,
      user: userId,
    });

    if (!financeData) {
      return res
        .status(404)
        .json({ error: "Finance record not found or unauthorized" });
    }

    res.status(200).json({ message: "Finance record deleted successfully" });
  } catch (error) {
    console.log("Delete finance controller error", error.message);
    return res.status(500).json(error.message);
  }
};
