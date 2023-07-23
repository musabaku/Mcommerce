const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name shouldnt exceed 30 characters"],
    minLength: [4, "Name should exceed 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validator: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should exceed 8 characters"],
    select: false,
  },
  
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
type:Date,
default:Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN 

userSchema.methods.getJWTToken = function () {
  return JWT.sign({ id: this._id}, process.env.JWT_SECRET, {expiresIn:'30d' });
};

// COMPARE PASSWORD 
userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

// reset password 
// userSchema.methods.getResetPasswordToken = function(){

//   const resetToken = crypto.randomBytes(20).toString("hex")

//   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

//   this.resetPasswordExpire = Date.now() + 15*60*1000

//   return resetToken;
// }
module.exports = mongoose.model("User", userSchema);



// User requests a password reset.
// Server generates a random token and hashes it.
// The hashed token is stored in the database, and the original token is sent to the user's email.
// The user follows the link in the email, which includes the original token.
// The server hashes the token from the link and compares it to the hashed token in the database.
// If the hashed tokens match, the user can reset their password. If not, an error is returned.
