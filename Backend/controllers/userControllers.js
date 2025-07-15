const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const secretKey = process.env.JWT_SECRET || "yourSuperSecretKey";

async function registerUser(req, res) {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await userModel.findOne({ userEmail: email });
    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserData = new userModel({
      userId: Date.now(),
      userName,
      userEmail: email,
      userPassword: hashedPassword,
      userRole: "user",
      userProfileImg: "/static/profile/user.png",
    });
    await newUserData.save();
    res.status(201).send("User saved successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving user");
  }
  // const result = await userModel.res.status(result.status).json({
  //   success: true,
  //   ...result,
  // });
  // } catch (error) {
  //   res.status(error.status || 500).json({
  //     success: false,
  //     ...error,
  //   });
  // }
}

async function loginUser(req, res) {
  const { userEmail, userPassword } = req.body;

  try {
    // 🧠 Find user by email
    const user = await userModel.findOne({ userEmail });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔍 Compare entered password with hashed password
    const isPasswordMatch = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 🎉 Success
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
} // try {
//   // const result = await loginUserRender(req);
//   const { userEmail, userPassword } = req.body;

//   res.status(result.status).json({
//     success: true,
//     ...result,
//   });
// } catch (error) {
//   res.status(error.status || 500).json({
//     success: false,
//     ...error,
//   });
// }

async function updateUser(req, res) {
  try {
    const { id, name, role } = req.params;

    const updatedUser = await userModel.findOneAndUpdate(
      { userId: Number(id) }, // convert to Number if needed
      {
        userName: name,
        userRole: role,
      },
      {
        new: true, // return updated document
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(201).json({
      success: true,
      status: 201,
      message: "Successfully modified user data",
      result: {
        userId: updatedUser.userId,
        userName: updatedUser.userName,
        userEmail: updatedUser.userEmail,
        userRole: updatedUser.userRole,
        userProfileImg: updatedUser.userProfileImg,
      },
    });
  } catch (error) {
    res.status(error.status || 400).json({
      success: false,
      message: error.message || "Data could not be modified",
    });
  }
}
// try {
//   const { id, name, role } = req.params;
//   const result = await updateUserRender(id, name, role);
//   res.json({
//     success: true,
//     status: 201,
//     message: "Successfully modified user data",
//     result,
//   });
// } catch (error) {
//   res.status(error.status || 400).json({
//     success: false,
//     message: error.message || "Data could not be modified",
//   });
// }

function updateUserRender(id, name, role) {
  return new Promise((resolve, reject) => {
    const jsonPath = path.join(__dirname, "..", "models", "users.json");

    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([]));
    }

    const tempArray = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const exist = tempArray.find((temp) => temp.userId === Number(id));

    if (!exist) {
      return reject({ status: 404, message: "User not found" });
    }

    exist.userName = name;
    exist.userRole = role;
    fs.writeFileSync(jsonPath, JSON.stringify(tempArray, null, 2));

    resolve({ status: 201, message: "Data updated successfully" });
  });
}

async function renderUserdata(req, res) {
  try {
    // const users = await renderUserdataProvider();
    const users = await userModel.find();
    console.log(users);
    // res.render("adminPage.jade", { users });
    res.json({ users });
  } catch (error) {
    res.status(error.status || 500).send(error.message || "Unknown error");
  }
}

async function renderSpecificUserdata(req, res) {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({ userId: Number(id) });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "User data retrieved successfully",
      result: {
        userId: user.userId,
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
        userProfileImg: user.userProfileImg,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Unable to retrieve user data",
    });
  }
  // try {
  //   const { id } = req.params;
  //   const result = await renderSpecificUserdataFromJson(id);
  //   res.status(result.status).json(result);
  // } catch (error) {
  //   res.status(error.status || 500).json({
  //     success: false,
  //     message: error.message || "Unable to retrieve user data",
  //   });
  // }
}

function renderSpecificUserdataFromJson(id) {
  return new Promise((resolve, reject) => {
    const jsonPath = path.join(__dirname, "..", "models", "users.json");

    if (!fs.existsSync(jsonPath)) {
      fs.writeFileSync(jsonPath, JSON.stringify([]));
    }

    const users = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const matchedUser = users.find((user) => user.userId === Number(id));

    if (!matchedUser) {
      return reject({
        status: 404,
        message: "User not found",
      });
    }

    resolve({
      status: 200,
      success: true,
      user: matchedUser,
    });
  });
}

async function deleteUserByEmail(req, res) {
  const id = req.params.id;

  try {
    const deletedUser = await userModel.findOneAndDelete({
      userId: Number(id),
    });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "User deleted successfully",
      result: {
        userId: deletedUser.userId,
        userName: deletedUser.userName,
        userEmail: deletedUser.userEmail,
        userRole: deletedUser.userRole,
        userProfileImg: deletedUser.userProfileImg,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to delete user",
    });
  }
  // const id = req.params.id;
  // try {
  //   const result = await deleteUserByEmailRender(id);
  //   res.status(result.status).json(result);
  // } catch (error) {
  //   res.status(error.status || 500).json({
  //     success: false,
  //     message: error.message || "Failed to delete user",
  //   });
  // }
}

function registerUserRender(req) {
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

function loginUserRender(req) {
  return new Promise(async (resolve, reject) => {
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

    const isMatch = await bcrypt.compare(userPassword, existUser.userPassword);
    if (!isMatch) {
      return reject({
        status: 401,
        message: "Password mismatch",
      });
    }

    const token = jwt.sign(
      {
        userEmail: existUser.userEmail,
        userName: existUser.userName,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    resolve({
      status: 200,
      message: "Successfully logged in",
      userName: existUser.userName,
      token,
    });
  });
}

function renderUserdataProvider() {
  return new Promise((resolve, reject) => {
    try {
      const jsonDatapath = path.join(__dirname, "..", "models", "users.json");
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

function deleteUserByEmailRender(id) {
  return new Promise((resolve, reject) => {
    const jsonDeletePath = path.join(__dirname, "..", "models", "users.json");

    if (!fs.existsSync(jsonDeletePath)) {
      fs.writeFileSync(jsonDeletePath, JSON.stringify([]));
    }

    const users = JSON.parse(fs.readFileSync(jsonDeletePath, "utf-8"));
    const filteredUsers = users.filter((user) => user.userId !== Number(id));
    console.log(users.length);

    if (users.length === filteredUsers.length) {
      return reject({ status: 404, message: "User not found" });
    }

    fs.writeFileSync(jsonDeletePath, JSON.stringify(filteredUsers, null, 2));
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
  updateUser,
  renderSpecificUserdata,

  // renderError,
  // loadImage,
};
