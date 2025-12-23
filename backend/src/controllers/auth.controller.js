const {registerUser,loginUser}=require("../services/auth.service");

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name||!email||!password){
            return res.status(400).json({
                error:"All feilds are necessay to register",
            });
        }

        const user=await registerUser({name,email,password});

        const userObj=user.toObject();
        delete userObj.password;  // removing the password before sending response 

        return res.status(201).json(userObj);
    }
    catch(error){
        return res.status(400).json({
            error:error.message,
        });
    }
};

const login=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                error:"Enter all feilds for logging in",
            });
        }

        const user=await loginUser({email,password});

        const userObj=user.toObject();
        delete userObj.password;  // delete the password before going ahead 

        return res.status(200).json(userObj);
    }
    catch(error){
        return res.status(401).json({
            error:error.message,
        });
    }
};

module.exports={register,login,};