const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/renderUsers", controllers.renderUserdata);
router.post("/deleteUser", controllers.deleteUserByEmail);

module.exports = router;
