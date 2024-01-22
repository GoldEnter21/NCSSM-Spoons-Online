const express = require('express');
const connectDB = require('./project/config/db');
const cors = require('cors');
const nodemailer = require('nodemailer');

// routes
const users = require('./routes/api/users')
const locations = require('./routes/api/locations');
const adkey = require('./routes/api/adkey');

const app = express();
// Connecting to the MongoDB database
connectDB();
//cors for authentication
//{ origin: true, credentials: true }
app.use(cors());
// Init Middleware - allows Express to read with POST and PUT requests
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));
app.post('/info/:email', (req, res) => {
    const { code } = req.body
    const { email } = req.params
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
                user: 'niranjan24s@ncssm.edu',
                pass: 'S@$$rab21dec',
            },
        secure: true,
        });
    var mailOptions = {
        from: 'niranjan24s@ncssm.edu',
        to: email,
        subject: 'Thank you for signing up for Spoons Of Glory 2024!',
        text: 'Hey Spoons Player!\n\nYour verification code is ' + code.toString() + "\nIf you have any questions, comments, or concerns, do not hesitate to contact me (Joy Niranjan) on Facebook!\n\n- Your Spoons Web Developer :)"
        };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
})

// use Routes  
app.use('/api/users', users);
app.use('/api/locations', locations);
app.use('/api/adkey', adkey)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

