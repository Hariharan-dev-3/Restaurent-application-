const express = require("express");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");
const bookingRouter = require("./routes/bookingRouter");
const tableRouter = require("./routes/tableRouter");
const app = express();
const cors = require("cors");
const path = require("path");
const dbConnection = require("./config/dbconnection");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));

dbConnection.connectToMongoDb();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/index", indexRouter);
app.use("/api/v1/table", tableRouter);
app.use("/api/v1/book", bookingRouter);
app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log(`server is running on http://localhost:8000`);
});
