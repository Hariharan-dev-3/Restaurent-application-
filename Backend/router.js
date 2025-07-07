const express = require("express");
const router = express.Router();
const controllers = require("./controllers");

router.get("/navbar", async (req, res) => {
  const navData = await controllers.renderNavs();
  console.log(navData);
  res.json(navData);
});
router.get("/menuitems", async (req, res) => {
  const menuData = await controllers.renderMenuitems();
  console.log(menuData);
  res.json(menuData);
});
router.get("/offers", async (req, res) => {
  const offerData = await controllers.renderOffers();
  console.log(offerData);
  res.json(offerData);
});
router.get("/gallery", async (req, res) => {
  const galleryData = await controllers.renderGallery();
  console.log(galleryData);
  res.json(galleryData);
});

module.exports = router;
