const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Image: { type: String, required: true }, 
})

module.exports = mongoose.model('Product', Product);
