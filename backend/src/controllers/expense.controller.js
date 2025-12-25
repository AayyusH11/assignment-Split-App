const Expense = require("../models/Expense");
const { applySplit } = require("../services/split.service");

const addExpense = async (req, res) => {
  try {
    console.log("Add Expense Request");
    console.log("BODY:", JSON.stringify(req.body, null, 2));

    const {
      description,
      amount,
      paidBy,
      groupId,
      splitType,
      participants,
      splits,
    } = req.body;

    
    if (!description || !amount || !paidBy || !groupId || !splitType) {
      throw new Error("Missing required fields");
    }

    if (!participants || participants.length === 0) {
      throw new Error("Participants required");
    }

    // splits must be an ARRAY for Expense
    let splitsArray = [];

    // EQUAL split handled by backend
    if (splitType === "EQUAL") {
      const share = amount / participants.length;

      splitsArray = participants.map((userId) => ({
        userId,
        amount: share,
      }));
    } else {
      // Exact and Percentage splits
      if (!splits || !Array.isArray(splits)) {
        throw new Error("Splits array required for EXACT / PERCENT");
      }

      splitsArray = splits.map((s) => {
        if (!s.userId || typeof s.amount !== "number") {
          throw new Error("Invalid split format");
        }
        return {
          userId: s.userId,
          amount: s.amount,
        };
      });
    }

    //save expenses with splits as array
    const expense = await Expense.create({
      description,
      amount,
      paidBy,
      groupId,
      splitType,
      splits: splitsArray,
    });

    // Convert array → map (only for balance logic)
    const splitsMap = {};
    splitsArray.forEach((s) => {
      splitsMap[s.userId] = s.amount;
    });

    // Update balances (dashboard logic)
    await applySplit({
      groupId,
      paidBy,
      amount,
      splitType,
      participants,
      splits: splitsMap,
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    console.error("ADD EXPENSE ERROR:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addExpense };
