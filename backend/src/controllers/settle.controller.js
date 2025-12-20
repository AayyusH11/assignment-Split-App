const Balance = require("../models/Balance");

const settleDues = async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    const balance = await Balance.findOne({ from, to });

    if (!balance) {
      return res.status(404).json({ error: "No pending dues found" });
    }

    if (amount > balance.amount) {
      return res.status(400).json({
        error: "Settlement amount exceeds due amount",
      });
    }

    const round2 = (num) => Math.round(num * 100) / 100;

// normalize inputs
    const settleAmount = round2(Number(amount));
    const currentAmount = round2(Number(balance.amount));

// calculate remaining
    const remaining = round2(currentAmount - settleAmount);

    if (remaining <= 0) {
     await balance.deleteOne();
     } else {
     balance.amount = remaining;
      await balance.save();
  }

    res.json({ message: "Dues settled successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { settleDues };
