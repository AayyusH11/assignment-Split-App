const bcrypt=require("bcrypt");
const User=require("../models/User");

const rounds=10;

const registerUser=async ({name,email,password})=>{
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new Error("User already exists");
    }

    const hashPassword=await bcrypt.hash(password,rounds);

    const user= await User.create({
        name,
        email,
        password:hashPassword,
    });

    return user;
};

const loginUser=async ({email,password})=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error("User Not Found");
    }

    if(!user.password){
        throw new Error("Enter Password Please");
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Wrong password");
    }

    // if right password then login 

    return user;

};

module.exports={
    registerUser,
    loginUser,
}
