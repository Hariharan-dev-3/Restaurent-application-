const express = require("express");
const router = express.Router();
const controllers = require("../controllers/indexController");


router.post("/bookTable", controllers.bookTable);


module.exports=router;