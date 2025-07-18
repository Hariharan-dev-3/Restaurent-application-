const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");
const regValidator = require("../middleware/regValidator");
const loginValidator = require("../middleware/loginValidator");
const isAuthenticated = require("../middleware/commonMiddleware");

// route info
router.post("/register", regValidator, controllers.registerUser);
router.post("/login", loginValidator, controllers.loginUser);
router.get("/getAllUsers", isAuthenticated, controllers.renderUserdata);
router.get("/getUser/:id", isAuthenticated, controllers.renderSpecificUserdata);
router.delete(
  "/deleteUser/:id",
  isAuthenticated,
  controllers.deleteUserByEmail
);
router.put(
  "/updateUser/:id/:name/:role/:Email",
  isAuthenticated,
  controllers.updateUser
);
router.get("/sort", controllers.sortUsers);
router.get("/search", controllers.searchUsers);


module.exports = router;
