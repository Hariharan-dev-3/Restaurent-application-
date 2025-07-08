const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const controllers = require("./controllers");

router.get("/navbar", async (req, res) => {
  try {
    const navData = await controllers.renderNavs();
    // console.log(navData);
    res.status(200).json(navData);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/menuitems", async (req, res) => {
  try {
    const menuData = await controllers.renderMenuitems();
    // console.log(menuData);
    res.status(200).json(menuData);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/offers", async (req, res) => {
  try {
    const offerData = await controllers.renderOffers();
    // console.log(offerData);
    res.status(200).json(offerData);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/gallery", async (req, res) => {
  try {
    const galleryData = await controllers.renderGallery();
    // console.log(galleryData);
    res.status(200).json(galleryData);
  } catch (error) {
    res.status(404).json(error);
  }
});
router.get("/booking", async (req, res) => {
  try {
    const bookingData = await controllers.renderBooking();
    // console.log(bookingData);
    res.status(200).json(bookingData);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/register", async (req, res) => {
  const jsonPath = path.join(__dirname, "models", "users.json");

  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
  }

  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.json({
      success: false,
      status: 400,
      message: "input values missing",
    });
  }

  const tempArray = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const alreadyExist = tempArray.some((user) => user.userEmail === email);
  if (alreadyExist) {
    return res.json({
      success: false,
      status: 409,
      message: "user already existed",
    });
  }
  const newUserData = {
    userId: new Date().getTime(),
    userName: userName,
    userEmail: email,
    userPassword: password,
    userRole: "user",
    userProfileImg: "/static/profile/user.png",
  };

  tempArray.push(newUserData);
  fs.writeFileSync(jsonPath, JSON.stringify(tempArray, null, 2));
  res.json({
    success: true,
    status: 201,
    message: "Data registered successfully",
  });
});

router.post("/login", (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log("📥 Received login request:", req.body);

  const jsonPath = path.join(__dirname, "./models", "users.json");

  // Ensure file exists
  if (!fs.existsSync(jsonPath)) {
    fs.writeFileSync(jsonPath, JSON.stringify([]));
  }

  const users = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const existUser = users.find(
    (user) =>
      user.userEmail.trim().toLowerCase() === userEmail.trim().toLowerCase()
  );

  if (!existUser) {
    console.log("❌ User not found:", userEmail);
    return res.status(404).json({
      success: false,
      message: "user not found error",
    });
  }

  if (existUser.userPassword !== userPassword) {
    console.log("❌ Password mismatch for:", userEmail);
    return res.status(401).json({
      success: false,
      message: "password mismatch error",
    });
  }

  console.log("✅ Login successful for:", existUser.userName);
  return res.status(200).json({
    success: true,
    message: "successfully logged in",
    userName: existUser.userName,
  });
});
module.exports = router;
