const express = require("express");
const {
  createGroup,
  getGroupsForUser,
  getGroupById,
  addMemberByEmail,
  settleGroup,
  getGroupBalancesController,
  getGroupHistoryController
} = require("../controllers/group.controller");


const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroupsForUser);      
router.get("/:groupId", getGroupById); 
router.post("/:groupId/add-member", addMemberByEmail);
router.get("/:groupId/balances", getGroupBalancesController);
router.get("/:groupId/balances", getGroupBalancesController);
router.get("/:groupId/history", getGroupHistoryController);
router.post("/:groupId/settle", settleGroup);
module.exports = router;
