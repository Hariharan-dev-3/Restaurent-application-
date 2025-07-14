const express = require("express");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");
const app = express();
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect("mongodb://localhost:27017/Restaurent")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.error("mongodb connection failed", err.message);
  });

// login register seperate api
// app.use((req, res, next) => {
//   const token = req.header.authorization;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       messege: "invalid token",
//     });
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
//     if (err) {
//       return res.status(403).json({
//         success: false,
//         messege: "token verification failed",
//       });
//     }
//     req.user = data;
//     next();
//   });
// });
app.use("/api/v1/user", userRouter);
app.use("/api/v1/index", indexRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});
