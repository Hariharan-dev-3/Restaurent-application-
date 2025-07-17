const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");

router.get("/navbar", controllers.renderNavs);
router.get("/menuitems", controllers.renderMenuitems);
router.get("/offers", controllers.renderOffers);
router.get("/gallery", controllers.renderGallery);
router.get("/booking", controllers.renderBooking);
router.get("/homePage", controllers.renderHomePage);
router.get("/adminPage", controllers.renderAdminPage);



module.exports = router;
