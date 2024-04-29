import { unique } from "next/dist/build/utils";

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://muneerashaik03:muneera03@cluster0.ckq1avn.mongodb.net/");

const userSchema = mongoose.Schema({
    userName : {
      type : String,
      required : true,
      unique : true,
      trim : true,
      lowercase : true,
      minLength : 3,
      maxLength : 30
    },
    password : {
      type : String,
      required : true,
      minLength : 6
    },
    firstName : {
     type : String,
     required : true,
     trim : true,
     maxLength : 50
    },
    lastName : {
     type : String,
     required : true,
     trim : true,
     maxLength : 50
    }
})
const accountSchema = mongoose.Schema({
  userId :{
    type :  mongoose.Schema.ObjectId,
    ref : "User",
    required : true
  },
  balance :{
    type : Number,
    required : true
  }
});
 export const Account = mongoose.model("Account",accountSchema);
export const User = mongoose.model("User",userSchema);