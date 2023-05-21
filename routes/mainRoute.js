const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "profile_picture." + file.mimetype.split("/")[1]);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const profileController = require("../controllers/mainController/profileController");
const blogController = require("../controllers/mainController/blogController");
const categoryController = require("../controllers/mainController/categoryController");

router.get("/profile", profileController.getProfile);

router.put(
  "/profile",
  upload.single("picture"),
  profileController.updateProfile
);

router.post("/blog", upload.single("blogImg"), blogController.createBlog);
router.get("/userblogs", upload.none(), blogController.getBlogByUser);
// router.post("/music", music.any("file"), blogController.uploadMusic);
router.post("/category", upload.none(), categoryController.createCategory);
router.get("/category", upload.none(), categoryController.getCategory);

router.get("/blog", upload.none(), blogController.getBlog);

module.exports = router;
