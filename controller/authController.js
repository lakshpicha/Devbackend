const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER

exports.register = async(req,res)=>{

try{

const {name, phonenumber,email,password}=req.body;

const existUser = await User.findOne({email});

if(existUser){
    return res.status(400).json({
        message:"User already exists"
    })
}


const hashPassword = await bcrypt.hash(password,10);

const user = await User.create({

    name,
    email,
    phonenumber,
    password:hashPassword

})


res.status(201).json({

    success:true,
    message:"User Registered Successfully",
    user

})

}

catch(err){

res.status(500).json({
    message:err.message
})

}

}


// LOGIN

exports.login = async(req,res)=>{

try{

const {email,password}=req.body;

const user = await User.findOne({email});

if(!user){

return res.status(400).json({

message:"User not found"

})

}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){

return res.status(400).json({

message:"Invalid Password"

})

}


const token = jwt.sign(

{
id:user._id
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);


res.cookie("token",token,{

httpOnly:true

});


res.status(200).json({

success:true,

message:"Login Successful",

token

})

}

catch(err){

res.status(500).json({

message:err.message

})

}

}


// LOGOUT

exports.logout=(req,res)=>{

res.cookie("token","",{

expires:new Date(0)

});


res.status(200).json({

success:true,

message:"Logout Successful"

})

}