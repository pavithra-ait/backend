const express = require('express');
const router = express.Router();
const product = require('../Schema/Product');
const multer = require('multer');
const fs = require('fs')

exports.search = (req, res) => {   
    const filterType = req.query.Product_Title;   
    product.find({Product_Title: filterType}, function(err, product){     
        if(err){       
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

router.post('/create', upload.single('image'), async (req, res) => {
    const data = await product.create({
        Product_Title: req.body.Product_Title,
        Product_Price: req.body.Product_Price,
        Product_File_Name: req.file.filename,
        Product_File_Path: req.file.path,
    })
    res.status(200).json(data)
})



router.get('/find', async (req, res) => {
    try {
        const data = await product.find(req.body)
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})

router.get('/find/:_id', async (req, res) => {
    const data = await product.findById(req.params._id)
    res.status(200).json(data)
})


router.put('/update/:id', upload.single('image'), async (req, res) => {
    const data = await product.findById(req.params.id)
    fs.unlinkSync(data.Product_File_Path)


    const datas = await product.findByIdAndUpdate(req.params.id, {
        $set: {
            Product_Title: req.body.Product_Title,
            Product_Price: req.body.Product_Price,
            Product_File_Name: req.file.filename,
            Product_File_Path: req.file.path,
        }
    })
    res.status(200).json(datas)

})

router.delete('/remove/:_id', async (req, res) => {
    const data = await product.findById(req.params._id)
    fs.unlinkSync(data.Product_File_Path)

    const datas = await product.findByIdAndDelete(req.params._id)
    res.status(200).json(datas)

})

module.exports = router;