const backendData = require("./dataModels/backendData");
const frontendData = require("./dataModels/frontendData");
const fs = require("fs");
const path = require("path");

function renderNavs(res) {
  try {
    res.writeHead(200, {
      "Content-Type": backendData.contentType.APPJSON,
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(frontendData.navBar));
  } catch (error) {
    console.log(error);
  }
}
function renderMenuitems(res) {
  try {
    res.writeHead(200, {
      "Content-Type": backendData.contentType.APPJSON,
      "Access-Control-Allow-Origin": "*",
    });
    res.end(JSON.stringify(frontendData.menuItemsList));
  } catch (err) {
    console.log(error);
  }
}

function loadImage(req, res) {
  const imagePath = path.join(__dirname, "..", "frontend", req.url);
  const ext = path.extname(imagePath).slice(1);
  const mime =
    {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
    }[ext] || "application/octet-stream";

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Image not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  });
}

function renderError(res) {
  try {
    res.writeHead(404, {
      "Content-Type": backendData.contentType.TEXTPLAIN,
      "Access-Control-Allow-Origin": "*",
    });
    res.end("url not founded");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  renderNavs,
  renderMenuitems,
  renderError,
  loadImage,
};
