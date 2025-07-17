const mongoose=require("mongoose");

const bookingSchema=new mongoose.Schema({
   
    userId: Number,
    tableId: Number,
    bookingDate: String,
    fromTime: String,
    toTime: String, 
})

const booking=mongoose.model('booking',bookingSchema);

module.exports=booking;
//TableId, UserId, BookedDate, FromTime, ToTime