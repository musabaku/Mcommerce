const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchasynerror");
const User = require("../models/userModel");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendemail");
const crypto = require("crypto");
const { ObjectId } = require('mongoose').Types;
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
   
  });

  sendToken(user, 200, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Please enter correct email and password", 401)
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// forgot password
// exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
//   const user = User.findOne({ email: req.body.email });

//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });
//   const resetPasswordUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/password/reset/${resetToken}}`;

//   const message = `Your reset password token is : \n\n ${resetPasswordUrl}. If you didnt request for reset password, Please Ignore it`;

//   try {
//     sendEmail({
//       email: user.email,
//       subject: "Password Recovery - Ecommerce",
//       message,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save({ validateBeforeSave: false });
//     return next(new ErrorHandler(error.message, 500));
//   }
// });

// Password token is hashed and stored in database

// exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(req.params.token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   });

//   if (!user) {
//     return next(
//       new ErrorHandler(
//         "Reset password token is invalid or has been expired",
//         400
//       )
//     );
//   }

//   if (req.body.password != req.body.confirmPassword) {
//     return next(new ErrorHandler("Password dont match", 400));
//   }
//   user.password = req.body.password;
//   resetPasswordToken = undefined;
//   resetPasswordExpire = undefined;

//   await user.save();
//   sendToken(user, 200, res);
// });


// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById({  _id: new ObjectId(req.user._id) });

  res.status(200).json({
    success: true,
    user,
  });
});

//update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password's Dont match", 400));
  }

  user.password = req.body.newPassword;
  // req.user is not same as user. req.user is cuurent authenticated user, it doenst contain password. user is a object of user model which was fetched above and it contains password. also comparepwd and save works on user and not req.user. req.user stays for a duration till login, if u make changes to it, it wont save in database anyways
  user.save();
  // res.status(200).json({
  //   success:true,
  //   message : "Password Changed Successfully"
  // })
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
console.log(newUserData)
  // not putting const user, i dont see any need
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log(newUserData)

  res.status(200).json({
    success: true,
    message: " Profile Updated Successfully",
    user,
  });
});

//Get all users (admin)

exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get a user detail (admin)

exports.getSingleUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User with id ${req.params.id} does not exist`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update user admin

exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  newData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
// req.params instead of req.user, coz if used req.user, admin will get updated
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    message: " Profile Updated Successfully",
  });
});
// delete user admin

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User with id ${req.params.id} does not exist`, 404)
    );
  }
  await user.remove() 
  res.status(200).json({ 
    success: true,
    message: "Profile Deleted Successfully",
  });
});



// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  

//   const user = await User.findByIdAndDelete(req.params.id, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: true,
//   });

//   res.status(200).json({
//     success: true,
//     message: "Profile Deleted Successfully",
//   });
// });

// this deletes one time, no error checking logic