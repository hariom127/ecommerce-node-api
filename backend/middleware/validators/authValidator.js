const { check, validationResult } = require("express-validator");

/*
 *Validate signup request fields
 */
exports.validateRequest = [
  check("firstName").notEmpty().withMessage("First Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is required"),
  check("email").isEmail().withMessage("Email must be a valied email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password atleast 6 character long"),
];

/*
 *Validate sign request fields
 */
exports.validateSignRequest = [
  check("email").isEmail().withMessage("Email must be a valied email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password atleast 6 character long"),
];

exports.isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  } else {
    next();
  }
};
