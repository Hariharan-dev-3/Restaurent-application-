const mongoose=require("mongoose");


function connectToMongoDb(){
try{
    mongoose
      .connect("mongodb://localhost:27017/Restaurent")
      .then(() => {
        console.log("mongodb connected");
      })
      .catch((err) => {
        console.error("mongodb connection failed", err.message);
      });
}
catch(err){
    console.log(err);
}
}

module.exports={connectToMongoDb};