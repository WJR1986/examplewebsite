const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

// Initialize Express app
const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML form page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submissions
app.post("/submit-form", async (req, res) => {
  try {
    // Verify reCAPTCHA token
    const recaptchaToken = req.body["g-recaptcha-response"];
    const captchaSecret = "YOUR_RECAPTCHA_SECRET_KEY";
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${recaptchaToken}`
    );

    if (!data.success) {
      throw new Error("reCAPTCHA verification failed");
    }

    // Extract form data
    const formData = req.body;

    // Create and configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your.email@gmail.com",
        pass: "your.email.password",
      },
    });

    // Compose email message
    const mailOptions = {
      from: "your.email@gmail.com",
      to: "recipient.email@example.com",
      subject: "New Form Submission",
      text: `Name: ${formData.name}\nPhone Number: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond to client
    res.send("Form submitted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
