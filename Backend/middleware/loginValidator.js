const express = require("express");
const app = express();

const loginValidator = app.use("/", (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail || !userPassword) {
    return reject({
      status: 400,
      message: "Input values missing",
    });
  }
  return next();
});

module.exports = loginValidator;
