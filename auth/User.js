const express = require('express');
const router = express.Router();
const user = require('../Schema/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



router.post('/register', async (req, res) => {
    try {

        const { User_Name, User_Email, User_Password } = req.body
        const hashpw = await bcrypt.hash(User_Password, 10)
        const User = await user.create({
            User_Name,
            User_Email,
            User_Password: hashpw
        });
        await User.save()

    
        res.status(200).json(User)
    }
    catch (err) {
        res.status(401).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {

        const { User_Email } = req.body

        const User = await user.findOne(User_Email)

        if (!User) {
            res.status(401).json('invalid user')
        }

        const Pw = await bcrypt.compareSync(req.body.User_Password, User.User_Password)

        if (!Pw) {
            res.status(401).json('invalid PASSSWORD')

        }
        const token = await jwt.sign({
            userId: User._id
        }, "UsEr")

        res.status(200).json({ token })
    }
    catch (err) {
        res.status(401).json(err)
    }
})



router.get('/get', async (req, res) => {
    const token = req.headers.authorization;
    try {

        const decoded = await jwt.verify(token, 'UsEr', (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
        const Userid = decoded.userId
        res.status(200).json(Userid)
    }
    catch (err) {
        res.status(401).json(err)
    }
})



module.exports = router;


