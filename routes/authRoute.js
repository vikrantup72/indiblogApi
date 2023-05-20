const express = require("express");
const router = express.Router();
const multer = require("multer");
const registrationController = require("../controllers/registrationController");
const loginController = require("../controllers/loginController");

const upload = multer();

router.post("/login", upload.none(), loginController.login);

router.post(
  "/registration",
  upload.none(),
  registrationController.registration
);

module.exports = router;
