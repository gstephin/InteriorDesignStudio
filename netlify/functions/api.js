import express from 'express';
import serverless from 'serverless-http';
import { Pool } from 'pg';

// Create a simpler Express app for Netlify functions
const app = express();
app.use(express.json());

// Create a database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Contact form submission endpoint
app.post('/.netlify/functions/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const submittedAt = new Date().toISOString();
    
    const result = await pool.query(
      'INSERT INTO "contactSubmissions" (name, email, phone, service, message, "submittedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, phone, service, message, submittedAt]
    );
    
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Get all contact submissions endpoint (if needed)
app.get('/.netlify/functions/api/contact', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "contactSubmissions" ORDER BY "submittedAt"'
    );
    
    return res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return res.status(500).json({ error: 'Failed to fetch contact submissions' });
  }
});

// Export the serverless function
export const handler = serverless(app);