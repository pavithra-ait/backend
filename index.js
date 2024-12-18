const express = require('express');
const app = express()
const cors = require('cors');
const bodyparser = require('body-parser')
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const connectDB = require('./db/Connection')
const authRoutes = require('./route/User');
const authproduct = require('./route/Productcontroll');

connectDB()

const corsorigin = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsorigin))
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }))
const path = require('path')



app.use('/api/auth', authRoutes);
app.use('/api/product', authproduct);
app.use('/view', express.static(path.join(__dirname, 'uploads'))); 

function sendmail() {
    const transportmailer = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aitpavithra@gmail.com',
            pass: 'zmsh mbjp rprh ayox'
        }
    })

    const mailDetails = {
        from: 'aitpavithra@gmail.com',
        to: 'aitpavithra@gmail.com',
        subject: 'node js sample mail',
        text: 'Hello pavithra!'
    };

    transportmailer.sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log("Error Occurs", err);
            } else {
                console.log("Email sent successfully", data.response);
            }
        });
}

cron.schedule('*/180 * * * * * ', () => {
    // sendmail()
    console.log("task is running every minute");
})




const port = 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})




