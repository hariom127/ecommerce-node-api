const User = require("../../models/user");
const ErrorHandler = require("../../ulits/errorHandler");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const sendToken = require("../../ulits/jwtToken");
const { exec } = require("child_process");

/*
| Register User
| /api/v1/register
*/
exports.signup = catchAsyncErrors(async (req, res) => {
  const { firstName, lastName, email, password, profile, contact } = req.body;

  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(422).json({
        message: "Admin already exist",
      });
    }
    const createAdmin = new User({
      firstName,
      lastName,
      email,
      contact,
      password,
      profile,
      role: "admin",
    });
    createAdmin.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "Admin has been created !",
          user: data,
        });
      }
    });
  });
});

/*
| login User
| /api/v1/login
*/
exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  // check is password correct or not
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

/*
| logout User
| /api/v1/users/logout
*/
exports.logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

/*
| get profile of login User
| /api/v1/users/profile
*/
exports.adminProfile = catchAsyncErrors(async (req, res, next) => {
  return res.status(200).json({
    message: "Profile get successfully!",
    profile: req.user,
  });
});
