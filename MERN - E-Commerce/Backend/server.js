const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./database");
// const cors = require("cors"); 
// const corsOptions = require('./config/corsOptions')
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "Backend/config/config.env" });
}
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,           
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
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


