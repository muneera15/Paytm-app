const express = require("express");

const {User} = require("../db")

const zod = require("zod");

const {JWT_SECRET} = require("../config")

export const router = express.Router;

const signupSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})
 router.post("/signup", async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if (! success){
      return res.json({
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
