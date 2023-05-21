const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
var multer = require("multer");
var bodyParser = require("body-parser");
const authRoute = require("./routes/authRoute");
const mainRoute = require("./routes/mainRoute");

//middleware
app.use(express.json());
// app.use(multer().array());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ message: "Token is not valid" });
  }
}
// routes
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", authRoute);
app.use("/api/v1", verifyToken, mainRoute);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
