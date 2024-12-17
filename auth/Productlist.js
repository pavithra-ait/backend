const fs = require('fs')
const Productdata = require('../Models/Product');


class ProductController {
    async indexdata(req, res) {
        try {
            const product = await Productdata.findById(req.params._id);
        
            if (!product) {
              return res.status(404).json({ error: 'Product not found.' });
            }
        
            res.status(200).json(product);
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }

    async getdata(req, res) {
        try {
            const products = await Productdata.find(req.body);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createdata(req, res) {
        try {
            const { Name, Price } = req.body;

            if (!req.file) {
                return res.status(400).json({ error: 'Image file is required.' });
            }

            const newProduct = await Productdata.create({
                Name,
                Price,
                Image: req.file.path,
            });

            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async putdata(req, res) {
        try {
            const { Name, Price } = req.body;

            const updateData = { Name, Price };
            const product = await Productdata.findById(req.params.id);
            fs.unlinkSync(product.Image)
           

            const updatedProduct = await Productdata.findByIdAndUpdate(req.params.id, updateData);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found.' });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletedata(req, res) {
        try {
            const deletedProduct = await Productdata.findByIdAndDelete(req.params.id);
        
            if (!deletedProduct) {
              return res.status(404).json({ error: 'Product not found.' });
            }
        
            res.status(200).json({ message: 'Product deleted successfully.' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
    async searchdata(req, res) {

        try {
            const { Name } = req.query; 
            let products;

            if (title) {
                products = await Productdata.find({
                    title: new RegExp(Name, 'i'),
                });
            }
            res.json(products);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching products');
        }

    }
}

module.exports = new ProductController();


