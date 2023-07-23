const express = require("express")
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser")
const path = require("path");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "Backend/config/config.env" });
}
const app = express();
app.use(express.json())
app.use(cookieParser())
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")

app.use("/api/v1",product)
app.use("/api/v1",user)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware)



module.exports = app

// import express, use app as alias. 
// express.json to parse incoming client request, so that we can access url , status code, request body and manipulate stuff
// we are making two routes, one related to product (crud) other - user register and login
// for error handling, we use error middleware 


// not using
// const order = require("./routes/orderRoute")
// app.use("/api/v1",order)