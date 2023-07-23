const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    ),

    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

// the sendToken function is a way to generate a JWT for a user, set it as a HTTP cookie, and send it to the client in the HTTP response body for user authentication.
