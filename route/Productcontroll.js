const express = require('express');
const router = express.Router();
const product = require('../Schema/Product');
const multer = require('multer');
const productdata = require('../Product/Productlist');

exports.search = (req, res) => {
    const filterType = req.query.Product_Title;
    product.find({ Product_Title: filterType }, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            res.json(product);
        }
    })
};

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: Storage })

class productController extends productdata {
    constructor(model) {
        super()
        this.model = model;

        // All the routes declared here!
        router.get('/find', this.get);
        router.get('/find/:_id', this.index);
        router.post('/create', upload.single('image'), this.create);
        router.put('/update/:id', upload.single('image'), this.put);
        router.delete('/remove/:_id', this.delete);
    }
}

new productController(product);

module.exports = router;