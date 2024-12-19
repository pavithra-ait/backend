const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    Name: { type: String },
    Price: { type: String },
    File_name: { type: String },    
    Dates: { type: Date}, 
    Stock: { type: String}

})

module.exports = mongoose.model('Product', Product);
