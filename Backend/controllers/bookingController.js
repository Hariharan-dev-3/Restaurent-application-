const tableModel = require("../models/table");
const bookingModel = require("../models/booking");


async function bookTable(req, res) {
  try {
    const { userId, tableId, bookingDate, fromTime, toTime } = req.body;

    const table = await tableModel.findOne({ "tables.tableId": tableId });
    if (!table) {
      return res.status(404).json({ error: "Table id not found." });
    }

    const tableUnit = table.tables.find((t) => t.tableId === tableId);
    if (!tableUnit || !tableUnit.isAvailable) {
      return res.status(409).json({ error: "Table is not available." });
    }

    const overlappingBooking = await bookingModel.findOne({
      tableId,
      bookingDate,
      $or: [{ fromTime: { $lt: toTime }, toTime: { $gt: fromTime } }],
    });

    if (overlappingBooking) {
      return res.status(409).json({
        error: "Table is already booked.",
        nextAvailable: `Try after ${overlappingBooking.toTime}`,
      });
    }

    // Store the booking
    const newBooking = new bookingModel({
      userId,
      tableId,
      bookingDate,
      fromTime,
      toTime,
      craetedAt: Date.now(),
    });

    await newBooking.save();

    // Mark the table unit as unavailable and update inStack
    await tableModel.updateOne(
      { "tables.tableId": tableId },
      {
        $set: { "tables.$.isAvailable": false },
        $inc: { inStack: -1 },
      }
    );

    res.status(201).json({ message: "Booking successful." });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ error: error.message || "Booking failed." });
  }
}



module.exports={bookTable};