const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    Name: { type: String, },
    Price: { type: Number  },
    File_Path: { type: String}, 
    File_name: { type: String }
})

module.exports = mongoose.model('Product', Product);
