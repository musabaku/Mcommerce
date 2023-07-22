const mongoose = require("mongoose")
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log(`Connected to MongoDB successfully`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDatabase