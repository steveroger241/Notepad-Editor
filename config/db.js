const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose
    .connect(process.env.mongo)
    .then(() => {
        console.log("Mongo connected");
    })
    .catch((err) => {
        console.log("Mongo isn't connected --> ", err);
    })

module.exports = mongoose;