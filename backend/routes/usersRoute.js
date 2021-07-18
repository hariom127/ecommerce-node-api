var express = require("express");
var router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  validateRequest,
  validateSignRequest,
  isRequestValidate,
} = require("../middleware/validators/authValidator");
const {
  signup,
  loginUser,
  logoutUser,
  userProfile,
} = require("../controllers/UserController");

/*
 *users signup.
 *Route Syntex type-1
 */
router.route("/signup").post(validateRequest, isRequestValidate, signup);
// router.post("/signup", validateRequest, isRequestValidate, signup);
/*
 * users login.
 * *Route Syntex type-2
 */
router.post("/login", validateSignRequest, isRequestValidate, loginUser);

/*
 * users logout.
 */
router.post("/logout", logoutUser);

/*
 * users profile
 */
router.get("/profile", isAuthenticatedUser, userProfile);

module.exports = router;
