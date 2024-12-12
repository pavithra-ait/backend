const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const bodyparser = require('body-parser')
const userauth = require('./route/User')
const Product = require('./route/Productcontroll')
const cron = require('node-cron');
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

cron.schedule('* * * * * * ', () => {
    // sendMail()
    console.log("task is running every minute");

})

// async function sendMail() {
//     const transportmailer = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'aitpavithra@gmail.com',
//             pass: 'Pavithra@ait2002'
//         }
//     })

//     let mailDetails = await transporter.sendMail({
//         from,
//         to,
//         subject,
//         text,
//         html: `<strong>${text}</strong>`,
//     });
//         transportmailer.sendMail(mailDetails,
//             function (err, data) {
//                 if (err) {
//                     console.log("Error Occurs", err);
//                 } else {
//                     console.log("Email sent successfully",data);
//                 }
//             });

//     }

    const port = 5000;
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    })