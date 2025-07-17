const mongoose=require("mongoose");

const tableUnitSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});

const tableSchema = new mongoose.Schema({
  tableType: { type: String, unique: true },
  tablePrice: Number,
  createdAt: String ,
  totalStack: Number,
  inStack: Number,
  tables: [tableUnitSchema],
});

const table=mongoose.model('table',tableSchema);

module.exports=table;

//Table Type, TablePrice, CreatedAt, totalStock, InStack)