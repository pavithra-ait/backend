const mongoose = require('mongoose');

const User = mongoose.Schema({
    User_Name:{
        type:String
    },
    User_Email:{
        type:String
        
    },
    User_Password:{
        type:String
    }
})

module.exports = mongoose.model('user',User);