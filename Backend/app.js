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
app.use("/api/v1", router);
app.use(
  "/Images",
  express.static(path.join(__dirname, "..", "Frontend", "Images"))
);

app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});
