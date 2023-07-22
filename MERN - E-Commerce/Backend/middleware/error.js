const { JsonWebTokenError } = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorhandler")

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Servor Error"


    // handling mongodb error
    if(err === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHandler(message,400)
    }

    if(err.code === 1000){
        const message =  `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400)
    }

    if(err.name === "JsonWebTokenError"){
        const message = "json web token expired, please try again"
        err = new ErrorHandler(message,400)
    }
    if(err.name === "TokenExpiredError"){
        const message = "json web token expired, please try again"
        err = new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}