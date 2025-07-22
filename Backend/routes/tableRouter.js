const express = require("express");
const router = express.Router();
const controllers = require("../controllers/tableController");

router.post("/createTable", controllers.createTable);


module.exports=router;