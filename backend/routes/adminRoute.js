var express = require("express");
var router = express.Router();
const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");
const {
  validateRequest,
  validateSignRequest,
  isRequestValidate,
} = require("../middleware/validators/authValidator");
const {
  signup,
  loginAdmin,
  logoutAdmin,
  adminProfile,
} = require("../controllers/admin/AdminController");

/*
 *admin signup
 */
router.route("/signup").post(validateRequest, isRequestValidate, signup);

/*
 * admin login.
 */
router.post("/login", validateSignRequest, isRequestValidate, loginAdmin);

/*
 * admin logout.
 */
router.post("/logout", logoutAdmin);

/*
 * admin profile
 */
router.get("/profile", isAuthenticatedUser, adminProfile);

module.exports = router;
