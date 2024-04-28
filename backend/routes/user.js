const express = require("express");

const jwt = require("jsonwebtoken")

const {User} = require("../db")

const zod = require("zod");

const {JWT_SECRET} = require("../config")

const {authMiddleWare} = require("../middleware")

export const router = express.Router;


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
    const user = User.create({
      userName : body.userName,
      password : body.password,
      firstName : body.firstName,
      lastName : body.lastName
    });
    res.json ({
      message : "User created successfully"
    })
    const userId = user._id;
    const token = jwt.sign({
      userId
    },JWT_SECRET);
    res.json ({
      message : "User created successfully",
      token : token
    })

 })
 const singinSchema = zod.object({
  username : zod.string().email(),
  password : zod.string()
 })

 router.post("/signin", async (req,res,next)=>{
  const body = req.body;
  const obj = singinSchema.safeParse(body)
  if(! obj.success){
    return res.status(411).json({
      message : "Incorrect inputs"
    })
  }
  const user = await User.findOne({
    username : body.userName,
    password : body.password
  });

  if(user){
  const token = jwt.sign({userId : user._id},JWT_SECRET);
  return res.json({
    token : token
  })
  }
  res.status(411).json({
    message : "Error while logging in"
  })
 })

const updateSchema = zod.object({
  password : zod.string().optional(),
  firstName : zod.string().optional(),
  lastName : zod.string().optional()
})
router.post("/update",authMiddleWare,async (req,res)=>{
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
  return res.json({
    msg : "Updated successfully"
  })
}
res.status(411).json({
message : "not updated"
})
 })

 router.get("/bulk",async (req,res)=>{
  const filter = req.query.filter || "";

  const users = await User.find({
    $or : [{
      "firstName" : {
        "$regex" : filter
      },
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
      userId : user._id
    }))
  })
  })

