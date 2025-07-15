const express = require("express");
const app = express();



const regValidator = (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Input values missing",
    });
  }
  next();
};

module.exports = regValidator;