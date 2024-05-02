const express = require("express");

const router = express.Router();

const userRouter =require("./user");
const accountRouter = require("./account");

router.use("/user",userRouter);
router.use("/router",accountRouter);

module.exports = router;