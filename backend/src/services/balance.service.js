const mongoose = require("mongoose");
const Balance = require("../models/Balance");

const updateBalances = async (groupId, paidBy, splits) => {
    for (let split of splits) {
    if (split.userId.toString() === paidBy.toString()) continue;

    const from = split.userId;
    const to = paidBy;
    const amount = split.amount;

    // 1️⃣ Check same direction
    let sameDir = await Balance.findOne({ from, to, groupId });

    // 2️⃣ Check opposite direction
    let oppDir = await Balance.findOne({
      from: to,
      to: from,
      groupId,
    });

    if (sameDir) {
      // A owes B already
      sameDir.amount += amount;
      await sameDir.save();

    } else if (oppDir) {
      // B owes A, so NET it
      oppDir.amount -= amount;

      if (oppDir.amount > 0) {
        await oppDir.save();
      } else if (oppDir.amount < 0) {
        // Flip direction
        await Balance.findByIdAndUpdate(oppDir._id, {
          from,
          to,
          amount: Math.abs(oppDir.amount),
        });
      } else {
        // Exactly settled
        await Balance.findByIdAndDelete(oppDir._id);
      }

    } else {
      // No balance exists
      await Balance.create({
        from,
        to,
        amount,
        groupId,
      });
    }
  }
};

const settleGroupBalances = async (groupId) => {
  await Balance.deleteMany({
    groupId: new mongoose.Types.ObjectId(groupId),
  });
};

module.exports = { updateBalances, settleGroupBalances };
