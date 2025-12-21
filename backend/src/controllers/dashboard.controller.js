const mongoose = require("mongoose");
const Balance = require("../models/Balance");
const User = require("../models/User");

const round2 = (num) => Math.round(num * 100) / 100;




const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);

//in dashboard mutual settlement (when two users owe each other the same ammount that is not working
//change in logic required here 
//simply accumulating wont workout here

   

    const balances=await Balance.find({
      $or:[
        {from:userObjectId},
        {to:userObjectId},
      ],
    });

    const net={};

    balances.forEach(b=>{
      const from=b.from.toString();
      const to=b.to.toString();
      const amount=round2(Number(b.amount));
      
      
      if(from===userId){
        // i(logged in user) owe someone
        net[to]=round2((net[to] || 0)-amount);
      }

      if(to===userId){
        // someone owes me
        net[from]=round2((net[from]||0)+amount);
      }
    
    });

    // now can split into payeables and recievables 
   const youOwe =[];
    const owedToYou=[];

    Object.entries(net).forEach(([otherUserId,amount])=>{

      if(amount<0){
        youOwe.push({
          _id:otherUserId,
          amount:round2(Math.abs(amount)),
        });
      }
      else if(amount>0){
        owedToYou.push({
          _id:otherUserId,
          amount:round2(amount),

        });
      }
    });

    // mapping needed old approach will fail 

    const userIds = [...youOwe, ...owedToYou].map(u => u._id);
    // Fetching the user names
    const users = await User.find({ _id: { $in: userIds } });

    const userMap = {};
    users.forEach(u => {
      userMap[u._id.toString()] = u.name;
    });

    //Now will attach names for each section 
    youOwe.forEach(i => {
      i.name = userMap[i._id] || "Unknown";
    });

    owedToYou.forEach(i => {
      i.name = userMap[i._id] || "Unknown";
    });

    // Totals
    const totalYouOwe = round2(
      youOwe.reduce((sum, x) => sum + x.amount, 0)
    );

    const totalOwedToYou = round2(
      owedToYou.reduce((sum, x) => sum + x.amount, 0)
    );

    res.json({
      youOwe,
      totalYouOwe,
      owedToYou,
      totalOwedToYou,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboard };
