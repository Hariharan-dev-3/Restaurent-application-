const express = require("express");
const router = require("./router");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());
// app.use("/", (req, res, next) => {
//   next();
// });
// app.post("/submit", (req, res) => {
//   console.log(req.body);
//   res.json({
//     messege: "post req success",
//   });
// });
app.use(cors());
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));
app.use("/api/v1", router);
app.use("/jadeUrl", (req, res) => {
  res.render("home.jade", {
    title: "jade",
    name: "hari",
  });
});
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});
