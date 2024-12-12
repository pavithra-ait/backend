const fs = require('fs')

class product {
    contructor() { }

    index = async (req, res) => {
        const data = await this.model.findById(req.params._id)
        return res.send(this.apiSend(data))
    }

    get = async (req, res) => {
        const data = await this.model.find(req.body)
        return res.send(this.apiSend(data))

    }
    create = async (req, res) => {
        const data = await this.model.create({
            Product_Title: req.body.Product_Title,
            Product_Price: req.body.Product_Price,
            Product_File_Name: req.file.filename,
            Product_File_Path: req.file.path,
        })
        return res.send(this.apiSend(data))
    }
    put = async (req, res) => {

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

        return res.send(this.apiSend(datas))
    }

    delete = async (req, res) => {
        const data = await product.findById(req.params._id)
        fs.unlinkSync(data.Product_File_Path)

        const datas = await product.findByIdAndDelete(req.params._id)
        res.status(200).json(this.apiSend(datas))
    }

    apiSend = (json) => {
        return {
            data: json
        }
    }

}

module.exports = product;
