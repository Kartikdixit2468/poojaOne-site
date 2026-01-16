require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = 3000;

app.get("/", (req, res) => {
  res.send("It worked!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date() });
});


const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

/* ---------- helpers ---------- */

function formatEmailText(data) {
  return `
New Puja Booking Request

Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Date: ${data.date}
Location Type: ${data.locationType}
Address: ${data.address}
`;
}

function formatEmailHTML(data) {
  return `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color:#333;">
    <h2 style="color:#444;">🕉️ New Puja Booking Request</h2>

    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr>
        <td><b>Name</b></td>
        <td>${data.name}</td>
      </tr>
      <tr>
        <td><b>Phone</b></td>
        <td>${data.phone}</td>
      </tr>
      <tr>
        <td><b>Service</b></td>
        <td>${data.service}</td>
      </tr>
      <tr>
        <td><b>Date</b></td>
        <td>${data.date}</td>
      </tr>
      <tr>
        <td><b>Location Type</b></td>
        <td>${data.locationType}</td>
      </tr>
      <tr>
        <td><b>Address</b></td>
        <td>${data.address}</td>
      </tr>
    </table>

    <hr style="margin:20px 0;" />

    <p style="font-size:12px;color:#777;">
      This booking request was generated from your application.
    </p>
  </div>
  `;
}

/* ---------- route ---------- */

app.post("/api/email/send-email", async (req, res) => {
  try {
    const emailText = formatEmailText(req.body);
    const emailHTML = formatEmailHTML(req.body);

    const response = await resend.emails.send({
      from: "App <onboarding@resend.dev>",
      to: ["deeps.corner1712@gmail.com"],
      subject: "🕉️ New Puja Booking Request",
      text: emailText,   // fallback
      html: emailHTML,   // main formatted email
    });

    console.log("Email sent successfully via Resend");
    console.log("Resend response:", response);

    res.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ success: false });
  }
});

/* ---------- server ---------- */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
