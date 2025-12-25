const Expense = require("../models/Expense");
const mongoose = require("mongoose");

const getGroupBalances = async (groupId) => {
  const expenses = await Expense.find({
    groupId: new mongoose.Types.ObjectId(groupId),
    settledAt: null,
  })
    .populate("paidBy", "name")
    .populate("splits.userId", "name");

  const result = [];

  for (const expense of expenses) {
    const payer = expense.paidBy;

    for (const split of expense.splits) {
      if (!split.userId) continue;

      // critical: skip payer’s own share
      if (split.userId._id.toString() === payer._id.toString()) {
        continue;
      }

      // no netting
      result.push({
        from: split.userId._id,
        fromName: split.userId.name,
        to: payer._id,
        toName: payer.name,
        amount: split.amount,
        expenseId: expense._id,
        description: expense.description,
        createdAt: expense.createdAt,
      });
    }
  }

  return result;
};
  const getGroupHistory = async (groupId) => {
  const expenses = await Expense.find({
        groupId: new mongoose.Types.ObjectId(groupId),
        settledAt: { $ne: null },
      })
        .populate("paidBy", "name")
        .populate("splits.userId", "name");

      const history = [];

    for (const expense of expenses) {
      const payer = expense.paidBy;

      for (const split of expense.splits) {
        if (split.userId._id.toString() === payer._id.toString()) continue;

        history.push({
          from: split.userId._id,
          fromName: split.userId.name,
          to: payer._id,
          toName: payer.name,
          amount: split.amount,
          description: expense.description,
          createdAt: expense.createdAt,
          settledAt: expense.settledAt,
        });
      }
    }

  return history;
};


module.exports = { getGroupBalances,getGroupHistory };