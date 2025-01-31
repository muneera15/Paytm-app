const express = require("express");
const { authMiddleWare } = require("../middleware");
const { default : mongoose } = require("mongoose");
const { Account } = require ("../db");

const router = express.Router();

router.get("/balance", authMiddleWare, async (req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    })
    console.log(account);
    res.json({
        balance : account.balance
    })
})
router.post("/transfer",authMiddleWare,async(req,res)=>{
    const session = await mongoose.startSession();
console.log(" hello")
    session.startTransaction();
    const senderId = req.userId
    const { amount,to } = req.body;
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
    console.log("hai")
    if(!toAccount){
        console.log(toAccount,"heh")
        await session.abortTransaction();
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


module.exports = router;