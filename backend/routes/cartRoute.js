var express = require("express");
var router = express.Router();

const { isAuthenticatedUser, autherizeRoles } = require("../middleware/auth");

const { addItemToCart } = require("../controllers/CartController");

/**
 * Add Item to cart
 */
router.post(
  "/add-to-cart",
  isAuthenticatedUser,
  autherizeRoles("user"),
  addItemToCart
);

module.exports = router;
