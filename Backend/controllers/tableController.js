const tableModel = require("../models/table");

async function createTable(req, res) {
  try {
    const { tableType, tablePrice, totalStack } = req.body;
    const tables = [];
    for (let i = 1; i <= totalStack; i++) {
      const tableId = `${tableType}-${i.toString().padStart(2, "0")}`;
      tables.push({ tableId, isAvailable: true });
    }

    const newTable = new tableModel({
      tableType,
      tablePrice,
      totalStack,
      inStack: totalStack,
      createdAt: new Date().toISOString(),
      tables,
    });

    await newTable.save();
    res.status(201).json({ message: "✅ Table created successfully!" });
  } catch (error) {
    console.error("❌ Error saving table:", error);
    res
      .status(500)
      .json({ error: "Failed to store table data or already existed" });
  }
}

module.exports={createTable};