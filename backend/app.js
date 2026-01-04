const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
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
    const { message } = req.query;
    // Create a transporter object using SMTP transport
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
