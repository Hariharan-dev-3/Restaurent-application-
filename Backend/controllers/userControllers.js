const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const result = await registerUserRender(req);
    res.status(result.status).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      ...error,
    });
  }
}

async function loginUser(req, res) {
  try {
    const result = await loginUserRender(req);
    res.status(result.status).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      ...error,
    });
  }
}

async function renderUserdata(req, res) {
  try {
    const users = await renderUserdataProvider();
    console.log(users);
    res.render("adminPage.jade", { users });
  } catch (error) {
    res.status(error.status || 500).send(error.message || "Unknown error");
  }
}

async function deleteUserByEmail(req, res) {
  try {
    const { email } = req.body;
    const result = await deleteUserByEmailRender(email);
    res.status(result.status).json(result);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
}

function registerUserRender(req) {
  return new Promise(async (resolve, reject) => {
    const jsonPath = path.join(__dirname, ".", "models", "users.json");

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

function loginUserRender(req) {
  return new Promise(async (resolve, reject) => {
    const { userEmail, userPassword } = req.body;
    const jsonPath = path.join(__dirname, ".", "models", "users.json");

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

    const isMatch = await bcrypt.compare(userPassword, existUser.userPassword);
    if (!isMatch) {
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

function renderUserdataProvider() {
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

function deleteUserByEmailRender(email) {
  return new Promise((resolve, reject) => {
    const jsonDeletePath = path.join(__dirname, ".", "models", "users.json");

    if (!fs.existsSync(jsonDeletePath)) {
      fs.writeFileSync(jsonDeletePath, JSON.stringify([]));
    }

    const users = JSON.parse(fs.readFileSync(jsonDeletePath, "utf-8"));
    const filteredUsers = users.filter(
      (user) => user.userEmail.toLowerCase() !== email.toLowerCase()
    );

    if (users.length === filteredUsers.length) {
      return reject({ status: 404, message: "User not found" });
    }

    fs.writeFileSync(jsonDeletePath, JSON.stringify(filteredUsers, null, 2));

    const users2 = JSON.parse(fs.readFileSync(jsonDeletePath, "utf-8"));
    console.log(users2 || "empty");
    resolve({
      status: 200,
      success: true,
      message: "User deleted successfully",
    });
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
  registerUser,
  loginUser,
  renderUserdata,
  deleteUserByEmail,

  // renderError,
  // loadImage,
};
