const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: Number,
  tableId: String,
  bookingDate: String,
  fromTime: String,
  toTime: String,
  createdAt: String,
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;

//TableId, UserId, BookedDate, FromTime, ToTime
