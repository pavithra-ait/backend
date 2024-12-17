const express = require('express');
const router = express.Router();
const { register, login,getdata } = require('../auth/Userauth');

router.post('/register', register);
router.post('/login', login);
router.post('/get', getdata);

module.exports = router;

