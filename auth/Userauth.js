const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { name, password } = req.body;


    const user = await User.findOne({ name });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({
        id: user._id
    }, 'CrUd');
    return res.status(200).json({ token });
};

exports.getdata = async (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = await jwt.verify(token, 'CrUd');

    const data = User.findOne(decoded.id)
    return res.status(200).json(data);

}




