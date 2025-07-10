const frontendData = require("../dataModels/frontendData");

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

module.exports = {
  renderNavs,
  renderMenuitems,
  renderOffers,
  renderGallery,
  renderBooking,
  renderHomePage,
  // renderError,
  // loadImage,
};
