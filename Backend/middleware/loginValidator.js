const express = require("express");
const app = express();

const loginValidator = (req, res, next) => {
  const { userEmail, userPassword } = req.body;
  if (!userEmail || !userPassword) {
    return res.status(400).json({
      success: false,
      message: "Input values missing",
    });
  }
  next();
};
module.exports = loginValidator;
