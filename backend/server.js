const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
  const { name, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com', // Replace with your Gmail
      pass: 'yourapppassword',     // Use Gmail App Password
    },
  });

  let mailOptions = {
    from: 'youremail@gmail.com',
    to: 'Saraansh.Agarwal@in.ey.com',
    subject: 'BCM Expert Contact Request',
    text: `Name: ${name}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending email');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
