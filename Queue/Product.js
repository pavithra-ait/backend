const {addToQueue} = require('../server');


exports.createProduct = async () => {
 
    const task = {
      type: 'CREATE',
      execute: new ProductController.createdata,
    };
  
    addToQueue(task);
    res.status(201).json({ message: 'Product creation added to queue.' });
  };

  exports.getAllProducts = new ProductController.getdata;
  

  exports.getProductById = new ProductController.indexdata
  

  exports.updateProduct = async (req, res) => {
    
    const task = {
      type: 'UPDATE',
      execute: new ProductController.putdata
    };
  
    addToQueue(task);
    res.status(200).json({ message: 'Product update added to queue.' });
  };
  
  
  exports.deleteProduct = async (req, res) => {
  
    const task = {
      type: 'DELETE',
      execute: new ProductController.deletedata
    };
  
    addToQueue(task);
    res.status(200).json({ message: 'Product deletion added to queue.' });
  };
  