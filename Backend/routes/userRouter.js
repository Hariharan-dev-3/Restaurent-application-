const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/getAllUsers", controllers.renderUserdata);
router.delete("/deleteUser/:id", controllers.deleteUserByEmail);
// router.put("/user/:id", controllers.updateUser);


module.exports = router;
