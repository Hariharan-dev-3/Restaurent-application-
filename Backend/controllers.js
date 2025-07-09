// const backendData = require("./dataModels/backendData");
const frontendData = require("./dataModels/frontendData");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

function renderNavs() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.navBar);
    } catch (error) {
      reject(error);
    }
  });
}
function renderMenuitems() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.menuItemsList);
    } catch (error) {
      reject(error);
    }
  });
}
function renderOffers() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.imagefiles);
    } catch (error) {
      reject(error);
    }
  });
}
function renderGallery() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.galleryPics);
    } catch (error) {
      reject(error);
    }
  });
}
function renderBooking() {
  return new Promise((resolve, reject) => {
    try {
      resolve(frontendData.bookingPics);
    } catch (error) {
      reject(error);
    }
  });
}
function registerUser(req) {
  return new Promise(async (resolve, reject) => {
    const jsonPath = path.join(__dirname, "..", "models", "users.json");

    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([]));
    }

    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return reject({
        status: 400,
        message: "Input values missing",
      });
    }

    const tempArray = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const alreadyExist = tempArray.some((user) => user.userEmail === email);
    if (alreadyExist) {
      return reject({
        status: 409,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = {
      userId: Date.now(),
      userName,
      userEmail: email,
      userPassword: hashedPassword,
      userRole: "user",
      userProfileImg: "/static/profile/user.png",
    };

    tempArray.push(newUserData);
    fs.writeFileSync(jsonPath, JSON.stringify(tempArray, null, 2));

    resolve({
      status: 201,
      message: "Data registered successfully",
    });
  });
}

function loginUser(req) {
  return new Promise((resolve, reject) => {
    const { userEmail, userPassword } = req.body;
    const jsonPath = path.join(__dirname, "..", "models", "users.json");

    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([]));
    }

    const users = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    const existUser = users.find(
      (user) =>
        user.userEmail.trim().toLowerCase() === userEmail.trim().toLowerCase()
    );

    if (!existUser) {
      return reject({
        status: 404,
        message: "User not found",
      });
    }

    if (existUser.userPassword !== userPassword) {
      return reject({
        status: 401,
        message: "Password mismatch",
      });
    }

    resolve({
      status: 200,
      message: "Successfully logged in",
      userName: existUser.userName,
    });
  });
}

function renderUserdata() {
  return new Promise((resolve, reject) => {
    try {
      const jsonDatapath = path.join(__dirname, ".", "models", "users.json");
      console.log("📁 Reading from:", jsonDatapath);

      if (!fs.existsSync(jsonDatapath)) {
        fs.writeFileSync(jsonDatapath, JSON.stringify([]));
      }

      const fileContent = fs.readFileSync(jsonDatapath, "utf-8");
      console.log("📄 File content:", fileContent);

      const UserDataArray = JSON.parse(fileContent);

      const filteredUsers = UserDataArray.filter(
        (user) => user.userRole !== "Admin"
      );

      resolve(filteredUsers);
    } catch (error) {
      console.error("❌ Error loading user data:", error.message);
      reject({
        status: 500,
        message: "Failed to load user data",
        error: error.message,
      });
    }
  });
}
// function loadImage(req, res) {
//   const imagePath = path.join(__dirname, "..", "Frontend", req.url);
//   console.log("Trying to load image from:", imagePath);
//   const ext = path.extname(imagePath).slice(1);

//   const mime =
//     {
//       jpg: "image/jpeg",
//       jpeg: "image/jpeg",
//       png: "image/png",
//       webp: "image/webp",
//     }[ext] || "application/octet-stream";

//   fs.readFile(imagePath, (err, data) => {
//     if (err) {
//       console.error("Image load error:", err.message);
//       res.writeHead(404);
//       res.end("Image not found");
//       return;
//     }
//     res.writeHead(200, { "Content-Type": mime });
//     res.end(data);
//   });
// }

// function renderError() {
//   try {
//     res.writeHead(404, {
//       "Content-Type": backendData.contentType.TEXTPLAIN,
//       "Access-Control-Allow-Origin": "*",
//     });
//     res.end("url not founded");
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = {
  renderNavs,
  renderMenuitems,
  renderOffers,
  renderGallery,
  renderBooking,
  registerUser,
  loginUser,
  renderUserdata,
  // renderError,
  // loadImage,
};
