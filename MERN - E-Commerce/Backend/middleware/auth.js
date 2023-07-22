const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catchasynerror");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  // console.log("done")
  const { token } = req.cookies;
  // console.log(token)
  // console.log("done")

  if (!token) {
    return next(new ErrorHandler("Please login to access this page", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // it returns payload
  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user}, Unauthorized access`, 403));
    }
    next();
  };
};
