const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken")

const { User, Account } =require("../db");

const zod = require("zod");

const { JWT_SECRET } = require("../config");

const { authMiddleWare } = require ("../middleware");

const signupSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})
 router.post("/signup", async (req,res)=>{
  const body = req.body;
    const obj = signupSchema.safeParse(req.body);
    if (!obj.success){
      return res.status(411).json({
         message : "Email already exists / Incorrect inputs"
      })
    }
    const existingUser = await User.findOne({
      userName : body.userName
    })
    if(existingUser){
      return res.status(411).json({
         message : "Email already exists / Incorrect inputs"
      })
    }
    const user = await User.create({
      userName : body.userName,
      password : body.password,
      firstName : body.firstName,
      lastName : body.lastName
    });

    const userId = user._id;

    await Account.create({
      userId,
      balance : 1 + Math.random() * 1000
    })

    const token = jwt.sign({
      userId
    },JWT_SECRET);
    res.json ({
      message : "User created successfully",
      token : token
    })

 })
 const singinSchema = zod.object({
  userName : zod.string().email(),
  password : zod.string()
 })

 router.post("/signin", async (req,res)=>{
  const body = req.body;
  const obj = singinSchema.safeParse(body)
  if(! obj.success){
    return res.status(411).json({
      message : "Incorrect inputs"
    })
  }
  const user = await User.findOne({
    userName : body.userName,
    password : body.password
  });

  if(user){
  const token = jwt.sign({userId : user._id},JWT_SECRET);
  res.json({
    token : token
  })
  }
   return res.status(411).json({
    message : "Error while logging in"
  })
 })

const updateSchema = zod.object({
  password : zod.string().optional(),
  firstName : zod.string().optional(),
  lastName : zod.string().optional()
})
router.put("/",authMiddleWare,async (req,res)=>{
const body = req.body;
const obj = updateSchema.safeParse(body);

if(!obj.success){
return res.status(411).json({
  msg : "Error while updating information"
})
}
const user = User.updateOne(body,{
userId : req.userId
})
if(user){
  res.json({
    msg : "Updated successfully"
  })
}
 return res.status(411).json({
message : "not updated"
})
 })

 router.get("/bulk",async (req,res)=>{
  const filter = req.query.filter || "";

  const users = await User.find({
    $or : [{
      "firstName" : {
        "$regex" : filter
      }
    },{
      "lastName" : {
        "$regex" : filter
      }
    }]
  })
  res.json({
    user : users.map(user=>({
      userName : user.userName,
      firstName : user.firstName,
      lastName : user.lastName,
      _id : user._id
    }))
  })
  })
  module.exports = router;