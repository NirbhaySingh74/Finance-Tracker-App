import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Income", "Expense", "Investment", "Savings"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
      enum: ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Other"],
    },
  },
  { timestamps: true }
);

// Index on category for faster queries
financeSchema.index({ category: 1 });

export const FinanceModel = mongoose.model("FinanceModel", financeSchema);
