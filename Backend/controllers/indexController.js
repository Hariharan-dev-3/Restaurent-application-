const frontendData = require("../dataModels/frontendData");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

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
    // console.log(menuData);
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

// async function renderHomePage(req, res) {
//   try {
//     res.render();
//   } catch (error) {}
// }

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

module.exports = {
  renderNavs,
  renderMenuitems,
  renderOffers,
  renderGallery,
  renderBooking,
  // renderError,
  // loadImage,
};
