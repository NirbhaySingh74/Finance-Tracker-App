import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const FinanceModle = mongoose.model("FinanceModle", financeSchema);
