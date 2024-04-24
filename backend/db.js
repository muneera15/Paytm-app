const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://muneerashaik03:muneera03@cluster0.ckq1avn.mongodb.net/");

const userSchema = mongoose.Schema({
    userName : String,
    password : String,
    firstName : String,
    lastName : String
})

export const User = mongoose.model("User",userSchema);