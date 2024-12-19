const express = require('express');
const router = express.Router();
const ProductController = require('../auth/Productlist');
const Productdata = require('../Models/Product')
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Folder where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

router.get('/find', ProductController.getdata);
router.post('/create', upload.single('image'), ProductController.createdata);
router.get('/find/:_id', ProductController.indexdata);
router.put('/update/:id', upload.single('image'),async(req,res)=>{
    try {
        // Find the product by ID
        const data = await Productdata.findById(req.params.id);
        if (!data) {
          return res.status(404).json({ message: 'Product not found' });
        }
      
        const productId = req.params.id;
        if (!productId) {
             console.log("Error: Product ID is undefined");
             return;
        }

        await Productdata.findByIdAndUpdate(productId,{
            $set:{
                Name:req.body.Name,
                Price:req.body.Price,
                File_name: req.file.filename,
                Dates:req.body.Dates,
                Stock:req.body.Stock
            }
        } , { new: true })
        .then(updatedProduct => {
            res.json(updatedProduct);
        })
        .catch(err => {
            console.error("Error updating product:", err);
            res.status(500).send("Internal Server Error");
        });
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Server error');
      }
});

router.delete('/remove/:id', ProductController.deletedata);
router.get('/search', ProductController.searchdata)

module.exports = router;