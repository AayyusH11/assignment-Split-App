const Expense = require("../models/Expense");
const mongoose = require("mongoose");

const getGroupBalances = async (groupId) => {
  const expenses = await Expense.find({
    groupId: new mongoose.Types.ObjectId(groupId),
  })
    .populate("paidBy", "name email")
    .populate("splits.userId", "name email");

  //  just for check
  console.log("FIRST EXPENSE :");
  console.log(JSON.stringify(expenses[0], null, 2));

  const balances = [];

  for (const expense of expenses) {
    const paidBy = expense.paidBy;

    for (const split of expense.splits) {
      if (!split.userId) continue;
      if (split.userId._id.toString() === paidBy._id.toString()) continue;

      balances.push({
        from: split.userId.name,
        to: paidBy.name,
        amount: split.amount,
        expenseId: expense._id,
      });
    }
  }

  return balances;
};

module.exports = { getGroupBalances };