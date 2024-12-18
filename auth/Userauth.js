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
    try {
        const { name, password} = req.body;

        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Validate input
        if (!password || !user.password) {
            return res.status(400).json({ error: 'Password and hash are required' });
        }

     
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({
            id: user._id
        }, 'CrUd');
        return res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getdata = async (req, res) => {
    const token = req.header('Authorization').split(' ')[1];
    const decoded = await jwt.verify(token, 'CrUd');

    const data = User.findOne(decoded.id)
    return res.status(200).json(data);

}




