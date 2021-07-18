var express = require("express");
var router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

/**
 * __dirname => current directory name
 * path.dirname("dir_name") => return the parent dir. of provaided dir.
 * path.dirname(__dirname)
 * path.join("parent_dir", "chield_and_sub_chield") => join both parametrs path
 * */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/images/category"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
var uploadFile = multer({ storage: storage });

const { index, create } = require("../controllers/admin/CategoryController");

/* Create category. */
router.post(
  "/create",
  isAuthenticatedUser,
  autherizeRoles("admin"),
  uploadFile.single("categoryImage"),
  create
);

/* Get categories. */
router.get("/index", index);

module.exports = router;
