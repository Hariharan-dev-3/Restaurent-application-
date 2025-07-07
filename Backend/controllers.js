const backendData = require("./dataModels/backendData");
const frontendData = require("./dataModels/frontendData");
const fs = require("fs");
const path = require("path");

function renderNavs() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(frontendData.navBar);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
}
function renderMenuitems() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(frontendData.menuItemsList);
      });
    } catch (error) {
      reject(error);
    }
  });
}
function renderOffers() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(frontendData.imagefiles);
      }, 3000);
    } catch (error) {
      reject(error);
    }
  });
}
function renderGallery() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(frontendData.galleryPics);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
}

// function loadImage(req, res) {
//   const imagePath = path.join(__dirname, "..", "Frontend", req.url);
//   console.log("Trying to load image from:", imagePath);
//   const ext = path.extname(imagePath).slice(1);

//   const mime =
//     {
//       jpg: "image/jpeg",
//       jpeg: "image/jpeg",
//       png: "image/png",
//       webp: "image/webp",
//     }[ext] || "application/octet-stream";

//   fs.readFile(imagePath, (err, data) => {
//     if (err) {
//       console.error("Image load error:", err.message);
//       res.writeHead(404);
//       res.end("Image not found");
//       return;
//     }
//     res.writeHead(200, { "Content-Type": mime });
//     res.end(data);
//   });
// }

// function renderError() {
//   try {
//     res.writeHead(404, {
//       "Content-Type": backendData.contentType.TEXTPLAIN,
//       "Access-Control-Allow-Origin": "*",
//     });
//     res.end("url not founded");
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = {
  renderNavs,
  renderMenuitems,
  renderOffers,
  renderGallery,
  // renderError,
  // loadImage,
};
