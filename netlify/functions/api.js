import express from 'express';
import serverless from 'serverless-http';
import { db } from '../../server/db.js';
import { contactSubmissions } from '../../shared/schema.js';

const app = express();
app.use(express.json());

// Contact form submission endpoint
app.post('/.netlify/functions/api/contact', async (req, res) => {
  try {
    const submission = {
      ...req.body,
      submittedAt: new Date().toISOString()
    };
    
    const [result] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
      
    return res.status(201).json(result);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contact submissions endpoint (if needed)
app.get('/.netlify/functions/api/contact', async (req, res) => {
  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(contactSubmissions.submittedAt);
      
    return res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Export the serverless function
export const handler = serverless(app);