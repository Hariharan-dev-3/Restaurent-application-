const express = require("express");
const app = express();



const loginValidator = app.use("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      status: 400,
      message: "Input values missing",
    });
  }
  return next();
});

module.exports = loginValidator;