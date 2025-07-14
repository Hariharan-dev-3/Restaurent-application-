const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");
const regValidator = require("../middleware/regValidator");
const loginValidator = require("../middleware/loginValidator");

router.post("/register", regValidator, controllers.registerUser);
router.post("/login", loginValidator, controllers.loginUser);
router.get("/getAllUsers", controllers.renderUserdata);
router.get("/getUser/:id", controllers.renderSpecificUserdata);
router.delete("/deleteUser/:id", controllers.deleteUserByEmail);
router.put("/updateUser/:id/:name/:role", controllers.updateUser);


module.exports = router;
