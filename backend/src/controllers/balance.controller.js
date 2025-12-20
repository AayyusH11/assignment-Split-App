const mongoose = require("mongoose");
const Balance = require("../models/Balance");
const simplifyBalances = require("../services/simplify.service");



const getBalances = async (req, res) => {
  const { groupId } = req.params;

  const balances = await Balance.find({
    groupId: new mongoose.Types.ObjectId(groupId),
  });

  const simplified = simplifyBalances(balances);
  res.json(simplified);
};



module.exports = {getBalances,settlePartialBalance};
