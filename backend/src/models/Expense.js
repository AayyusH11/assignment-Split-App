const mongoose = require("mongoose");

// sub-schema for each user's split
const splitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    splitType: {
      type: String,
      enum: ["EQUAL", "EXACT", "PERCENT"],
      required: true,
    },

    
    splits: {
      type: [splitSchema],
      required: true,
    },
    settledAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);