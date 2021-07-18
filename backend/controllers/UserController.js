const User = require("../models/user");

const ErrorHandler = require("../ulits/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../ulits/jwtToken");
// const sendEmail = require("../ulits/sendEmail");
const crypto = require("crypto");
const { exec } = require("child_process");

/*
| Register User
| /api/v1/users/signup
*/
exports.signup = catchAsyncErrors(async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, profile, contact } = req.body;

  User.findOne({ email }).exec((error, user) => {
    if (user) {
      return res.status(422).json({
        message: "User already exist",
      });
    }
    const createUser = new User({
      firstName,
      lastName,
      email,
      contact,
      password,
      profile,
    });
    createUser.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong!",
        });
      }
      if (data) {
        return res.status(200).json({
          message: "User has been created !",
          user: data,
        });
      }
    });
  });
});

/*
| login User
| /api/v1/users/login
*/
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter a valid email and password"),
      400
    );
  }
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
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
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
exports.userProfile = catchAsyncErrors(async (req, res, next) => {
  return res.status(200).json({
    message: "Profile get successfully!",
    profile: req.user,
  });
});
