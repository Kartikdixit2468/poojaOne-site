require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
//   origin: "http://localhost:5173",
    origin: "*",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const port = 3000;
app.get('/', (req, res) => {
  res.send('It worked!');
}
);

app.post('/api/email/send-email/', async (req, res) => {
    console.log("Email API called");
    const message = req.body;
    console.log("Email message content:", message);
    
    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAIL_APP_PASSWORD,
            },
        });

        // Define email options
        const mailOptions = {
            from: process.env.MAIL,
            to: "Kartikdixit2107@gmail.com",
            subject: 'New Message',
            text: `${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
