const mongoose=require("mongoose");

const tableSchema=new mongoose.Schema({
   
    tableType: String,
    tablePrice: Number,
    totalStack: Number,
    inStack: Number,
    // createdAt: String, 
})

const table=mongoose.model('table',tableSchema);

module.exports=table;

//Table Type, TablePrice, CreatedAt, totalStock, InStack)