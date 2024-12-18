const express = require('express');
const router = express.Router();
const upload = require('../auth/Product')
const ProductController = require('../auth/Productlist');
const Productdata = require('../Models/Product')
const fs = require('fs');

router.get('/find', ProductController.getdata);
router.post('/create', upload.single('image'), ProductController.createdata);
router.get('/find/:_id', ProductController.indexdata);
router.put('/update/:id', upload.single('image'), async (req, res) => {
    console.log('Received product ID:', req.params.id); // Log the ID received
    const productId = ObjectId(req.params.id);

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        
        if (!updatedProduct) {
            console.log('Product not found');
            return res.status(404).json({ message: "Product not found" });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/remove/:id', ProductController.deletedata);
router.get('/search', ProductController.searchdata)

module.exports = router;