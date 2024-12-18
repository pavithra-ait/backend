const mongoose = require('mongoose')

function connectDB() {
    mongoose.connect('mongodb://127.0.0.1:27017/Crudapp', {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
    })
        .then(() => {
            console.log("mongodb connected successfully");
        }).catch(err => console.log(err))

}

module.exports = connectDB;



