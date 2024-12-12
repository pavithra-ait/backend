const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const bodyparser = require('body-parser')
const userauth = require('./auth/User')
const Product = require('./route/Productcontroll')
const nodemailer = require('nodemailer');


const corsorigin = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsorigin))
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))


mongoose.connect('mongodb://0.0.0.0:27017/Crudapp')
    .then(() => {
        console.log("mongodb connected successfully");
    }).catch(err => console.log(err))


app.use('/view', express.static('upload/'))

app.use('/auth', userauth)
app.use('/product', Product)
app.use('/search', Product.search)

// const transporter = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.gmail.com",
// });

// const mailConfigurations = {

//     from: 'aitpavithra@gmail.com',


//     to: 'aitpavithra@gmail.com',
//     subject: 'Sending Email using Node.js',

//     text: 'Hi! There, You know I am using the'
//         + ' NodeJS Code along with NodeMailer '
//         + 'to send this email.'
// };

// transporter.sendMail(mailConfigurations, function (error, info) {
//     if (error) throw Error(error);
//     console.log('Email Sent Successfully');
//     console.log(info);
// });


const port = 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})