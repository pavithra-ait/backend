const express = require('express');
const router = express.Router();
const user = require('../Schema/User');
const userdata = require('../auth/Userauth');

class userController extends userdata {
    constructor(model) {
      super()
      this.model = model;
  
      // All the routes declared here!
      router.get('/find', this.get);
      router.post('/register', this.create);
      router.post('/login', this.creates);
    }
  }
  
  new userController(user);
  
  module.exports = router;




