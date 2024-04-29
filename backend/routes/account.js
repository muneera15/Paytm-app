const express = require("express");
const {authMiddleware} = require ("../middleware");
const {default : mongoose} = require("mongoose");
const {Account} = require("../db");

const router = express.Router();

router.get("/balance",authMiddleware, async (req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    })
    res.json({
        balance : account.balance
    })
})
router.post("/transfer",authMiddleware,async(req,res)=>{
    const session = mongoose.startSession();

    session.startTransaction();
    const senderId = req.userId
    const {amount,to} = req.body;
    const account = await Account.findOne({
        userId : senderId
    }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({
        userId : to
    }).session(session);
    if(!toAccount){
        (await session).abortTransaction();
        return res.status(400).json({
            message : "Invalid account"
        })
    }
    await Account.updateOne({userId : senderId},{$inc: {balance : -amount}}).session(session);
    await Account.updateOne({userId : to},{$inc : {balance : amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message : "Transaction successfull"
    })
})