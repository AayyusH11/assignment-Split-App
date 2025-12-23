const express = require("express");
const {
  createGroup,
  getGroupsForUser,
  getGroupById,
  addMemberByEmail,
  settleGroup,
  getGroupBalancesController
} = require("../controllers/group.controller");


const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroupsForUser);      
router.get("/:groupId", getGroupById); 
router.post("/:groupId/add-member", addMemberByEmail);
router.post("/:groupId/settle", settleGroup);
router.post("/:groupId/settle", settleGroup);
router.get("/:groupId/balances", getGroupBalancesController);

module.exports = router;
