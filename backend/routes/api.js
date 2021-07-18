var express = require("express");
var router = express.Router();

/* GET test api. */
router.get("/test", function (req, res, next) {
  res.status(200).json({
    success: true,
    message: "data get successfully.",
  });
});

module.exports = router;
