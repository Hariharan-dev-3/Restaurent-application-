const express = require("express");
const app = express();
app.use(express.json());
app.use("/", (req, res) => {
  res.json({
    success: true,
    messege: "hello world",
  });
});
app.post("/submit", (req, res) => {
  console.log(req.body);
  res.json({
    messege: "post req success",
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
