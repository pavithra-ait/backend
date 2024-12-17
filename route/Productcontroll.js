const express = require('express');
const router = express.Router();
const upload = require('../auth/Product')
const ProductController = require('../auth/Productlist');
const path = require('path')


router.use('/view', express.static(path.join(__dirname, 'upload'))); 
router.get('/find',  ProductController.getdata);
router.post('/create', upload.single('image'), ProductController.createdata);
router.get('/find/:_id', ProductController.indexdata);
router.put('/update/:id', upload.single('image'), ProductController.putdata);
router.delete('/remove/:id', ProductController.deletedata);

module.exports = router;