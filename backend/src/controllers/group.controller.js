const Group = require("../models/Group");
const { getGroupBalances } = require("../services/groupBalance.service");
const { settleGroupBalances } = require("../services/balance.service");
const Expense = require("../models/Expense");
const { getGroupHistory } = require("../services/groupBalance.service");

// Create group
const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get groups for a user
const getGroupsForUser = async (req, res) => {
  const { userId } = req.query;

  const groups = await Group.find({
    members: userId,
  }).populate("members", "name email");

  res.json(groups);
};

const getGroupById = async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId).populate(
    "members",
    "name email"
  );

  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  res.json(group);
};

const User = require("../models/User");


const getGroupBalancesController = async (req, res) => {
  const { groupId } = req.params;

  const balances = await getGroupBalances(groupId);
  res.json(balances);
};


const getGroupHistoryController = async (req, res) => {
  const { groupId } = req.params;
  const history = await getGroupHistory(groupId);
  res.json(history);
};


const addMemberByEmail = async (req, res) => {
  const { groupId } = req.params;
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "No such user exists" });
  }

  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).json({ error: "Group not found" });
  }

  if (group.members.includes(user._id)) {
    return res.status(400).json({ error: "User already in group" });
  }

  group.members.push(user._id);
  await group.save();

  res.json({ message: "User added to group", user });
};

const settleGroup = async (req, res) => {
  const { groupId } = req.params;

  // Clear NET balances (dashboard)
  await settleGroupBalances(groupId);

  //  Mark aLL active expenses as settled
  const result=await Expense.updateMany(
    { groupId, settledAt: null },
    { $set: { settledAt: new Date() } }
  );

   console.log("SETTLED EXPENSES:", result.modifiedCount);

  res.json({
    message: "Group settled successfully",
    settledCount: result.modifiedCount,
  });
};


module.exports = { createGroup, getGroupsForUser, getGroupById, addMemberByEmail,settleGroup,getGroupBalancesController,getGroupHistoryController  };

