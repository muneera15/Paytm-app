const express = require("express");

const zod = require("zod");

export const router = express.Router;

const signupSchema = zod.object({
    userName : zod.string,
    password : zod.string,
    firstName : zod.string,
    lastName : zod.string
})
 router.post("/signup",(req,res)=>{
    const body = req.body;
 })
 const signinSchema = zod.object({
    userName : zod.string,
    password : zod.string
 })