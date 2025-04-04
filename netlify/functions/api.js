import express from 'express';
import serverless from 'serverless-http';

// Create a simpler Express app for Netlify functions
const app = express();
app.use(express.json());

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
    
    // For development logging
    console.log('New contact submission:', newSubmission);
    
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