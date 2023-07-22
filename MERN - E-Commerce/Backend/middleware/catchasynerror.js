module.exports = catchAsyncErrors => (req,res,next) =>{
    Promise.resolve(catchAsyncErrors(req,res,next)).catch(next)
}



// Define the higher-order function
// const handleErrors = catchAsyncErrors => {
//     return (req, res, next) => {
//       Promise.resolve(catchAsyncErrors(req, res, next)).catch(next);
//     };
//   };
  
  // Export the middleware function
//   module.exports = handleErrors;