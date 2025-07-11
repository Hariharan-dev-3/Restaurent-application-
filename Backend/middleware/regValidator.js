const express = require("express");
const app = express();



const regValidator=app.use('/',(req,res,next)=>{
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return reject({
        status: 400,
        message: "Input values missing",
      });
    }
    return next();
})


module.exports=regValidator;