const mongoose = require("mongoose");
const Balance = require("../models/Balance");
const simplifyBalances = require("../services/simplify.service");

const round2 = (num) => Math.round(num * 100) / 100;



const getBalances = async (req, res) => {
  const { groupId } = req.params;

  const balances = await Balance.find({
    groupId: new mongoose.Types.ObjectId(groupId),
  });

  const simplified = simplifyBalances(balances);
  res.json(simplified);
};



const settlePartialBalance = async (req, res) => {
  const { from, to, amount } = req.body;

  const balance = await Balance.findOne({ from, to });

  if (!balance) {
    return res.status(404).json({ error: "No such balance exists" });
  }

  const currentAmount = round2(Number(balance.amount));
  const settleAmount = round2(Number(amount));

  // to avoid oversettlemetn 
  if (settleAmount > currentAmount) {
    return res.status(400).json({
      error: "Settlement amount exceeds due amount",
    });
  }

  const remaining = round2(currentAmount - settleAmount);

  if (remaining <= 0) {
    await Balance.deleteOne({ _id: balance._id });
  } else {
    balance.amount = remaining;
    await balance.save();
  }

  res.json({ message: "Balance settled successfully" });
};  // corrected the logic 



module.exports = {getBalances,settlePartialBalance};
