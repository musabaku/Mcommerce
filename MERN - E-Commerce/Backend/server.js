const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./database");
// const cors = require("cors"); 
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "Backend/config/config.env" });
}

// const corsOptions ={
//   origin:'*',
//     credentials:true,   
//     optionSuccessStatus:200,        
// }
// app.use(cors(corsOptions));
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://macommerce-ndrj.onrender.com', 'https://illustrious-crepe-c524d2.netlify.app','https://64bd3a3ba116002a6b68077b--friendly-malasada-66c970.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});
connectDatabase();



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});




// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error message : ${err.message}`);
  console.log("Closing Server due to uncaught exception");
  process.exit(1);
});



// Unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error message : ${err.message}`);
  console.log("Closing Server due to Unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});


