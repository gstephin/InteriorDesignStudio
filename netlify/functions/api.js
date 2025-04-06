import express from 'express';
import serverless from 'serverless-http';
import nodemailer from 'nodemailer';

// Create a simpler Express app for Netlify functions
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Simple in-memory storage for development and demo purposes
const contactSubmissions = [];

// Contact form submission endpoint
app.post('/.netlify/functions/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const submittedAt = new Date().toISOString();
    
    // Create a new submission
    const newSubmission = {
      id: contactSubmissions.length + 1,
      name,
      email,
      phone,
      service,
      message,
      submittedAt
    };
    
    // Add to in-memory storage
    contactSubmissions.push(newSubmission);
    
    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gstephin87@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Submitted At:</strong> ${submittedAt}</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
    }
    
    return res.status(201).json(newSubmission);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contact submissions endpoint (if needed)
app.get('/.netlify/functions/api/contact', async (req, res) => {
  try {
    return res.json(contactSubmissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Export the serverless function
export const handler = serverless(app);