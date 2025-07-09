const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userControllers");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.get("/renderUsers", controllers.renderUserdata);
router.post("/deleteUser", controllers.deleteUserByEmail);

// router.post("/register", async (req, res) => {
//   const jsonPath = path.join(__dirname, "models", "users.json");

//   if (!fs.existsSync(jsonPath)) {
//     fs.writeFileSync(jsonPath, JSON.stringify([]));
//   }

//   const { userName, email, password } = req.body;
//   if (!userName || !email || !password) {
//     return res.json({
//       success: false,
//       status: 400,
//       message: "input values missing",
//     });
//   }

//   const tempArray = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
//   const alreadyExist = tempArray.some((user) => user.userEmail === email);
//   if (alreadyExist) {
//     return res.json({
//       success: false,
//       status: 409,
//       message: "user already existed",
//     });
//   }
//   const newUserData = {
//     userId: new Date().getTime(),
//     userName: userName,
//     userEmail: email,
//     userPassword: password,
//     userRole: "user",
//     userProfileImg: "/static/profile/user.png",
//   };

//   tempArray.push(newUserData);
//   fs.writeFileSync(jsonPath, JSON.stringify(tempArray, null, 2));
//   res.json({
//     success: true,
//     status: 201,
//     message: "Data registered successfully",
//   });
// });

// router.post("/login", (req, res) => {
//   const { userEmail, userPassword } = req.body;
//   console.log("📥 Received login request:", req.body);

//   const jsonPath = path.join(__dirname, "./models", "users.json");

//   // Ensure file exists
//   if (!fs.existsSync(jsonPath)) {
//     fs.writeFileSync(jsonPath, JSON.stringify([]));
//   }

//   const users = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

//   const existUser = users.find(
//     (user) =>
//       user.userEmail.trim().toLowerCase() === userEmail.trim().toLowerCase()
//   );

//   if (!existUser) {
//     console.log("❌ User not found:", userEmail);
//     return res.status(404).json({
//       success: false,
//       message: "user not found error",
//     });
//   }

//   if (existUser.userPassword !== userPassword) {
//     console.log("❌ Password mismatch for:", userEmail);
//     return res.status(401).json({
//       success: false,
//       message: "password mismatch error",
//     });
//   }

//   console.log("✅ Login successful for:", existUser.userName);
//   return res.status(200).json({
//     success: true,
//     message: "successfully logged in",
//     userName: existUser.userName,
//   });
// });
module.exports = router;
