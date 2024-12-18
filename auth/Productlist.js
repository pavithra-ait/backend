const fs = require('fs').promises;
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
                File_Path: req.file.path,
                File_name: req.file.filename
            });

            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    async deletedata(req, res) {
        try {
            const { id } = req.params;
            const product = await Productdata.findByIdAndDelete(id);

            if (!product) {
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


