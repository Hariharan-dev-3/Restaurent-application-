const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");


router.post("/storeTable", controllers.storeTable);


module.exports=router;