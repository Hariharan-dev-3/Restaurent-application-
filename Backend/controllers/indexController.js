const frontendData = require("../dataModels/frontendData");
const userModel = require("../models/user");
const tableModel = require("../models/table");
const bookingModel = require("../models/booking");

async function renderNavs(req, res) {
  try {
    const navData = await renderNavService();
    // console.log(navData);
    res.status(200).json(navData);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function renderMenuitems(req, res) {
  try {
    const menuData = await renderMenuitemsService();
    console.log(menuData);
    res.status(200).json(menuData);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function renderOffers(req, res) {
  try {
    const offerData = await renderOffersService();
    // console.log(offerData);
    res.status(200).json(offerData);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function renderGallery(req, res) {
  try {
    const galleryData = await renderGalleryServices();
    // console.log(galleryData);
    res.status(200).json(galleryData);
  } catch (error) {
    res.status(404).json(error);
  }
}

async function renderBooking(req, res) {
  try {
    const bookingData = await renderBookingServices();
    res.status(200).json(bookingData);
  } catch (error) {
    res.status(404).send(error);
  }
}

function renderHomePage(req, res) {
  return new Promise((resolve, reject) => {
    res.render("home.jade", {}, (err, renderPage) => {
      if (err) {
        res.status(500).send("Rendering failed");
        return reject(err);
      }
      res.send(renderPage);
      resolve();
    });
  });
}

function renderAdminPage(req, res) {
  return new Promise(async (resolve, reject) => {
    const users = await userModel.find();
    res.render("adminPage.jade", { users }, (err, renderPage) => {
      if (err) {
        res.status(500).send("Rendering failed");
        return reject(err);
      }
      res.send(renderPage);
      resolve();
    });
  });
}

function renderNavService() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.navBar);
    } catch (error) {
      reject(error);
    }
  });
}

function renderOffersService() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.imagefiles);
    } catch (error) {
      reject(error);
    }
  });
}

function renderMenuitemsService() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.menuItemsList);
    } catch (error) {
      reject(error);
    }
  });
}

function renderGalleryServices() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.galleryPics);
    } catch (error) {
      reject(error);
    }
  });
}

function renderBookingServices() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.bookingPics);
    } catch (error) {
      reject(error);
    }
  });
}

async function storeTable(req, res) {
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

module.exports = {
  renderNavs,
  renderMenuitems,
  renderOffers,
  renderGallery,
  renderBooking,
  renderHomePage,
  renderAdminPage,
  storeTable,
  bookTable,
  // renderError,
  // loadImage,
};
