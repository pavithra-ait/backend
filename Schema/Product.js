const mongoose = require('mongoose');

const Product = mongoose.Schema({
    Product_Title:{
        type:String
    },
    Product_Price:{
        type:Number
    },
    Product_File_Name:{
        type:String
    },
    Product_File_Path:{
        type:String
    }
})

module.exports = mongoose.model('Product',Product);
