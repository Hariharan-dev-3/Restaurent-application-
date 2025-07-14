const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
   
    userId: Number,
    userName: String,
    userEmail: String,
    userPassword: String,
    userRole: String,
    userProfileImg: String,
})

const user=mongoose.model('user',userSchema);

module.exports=user;