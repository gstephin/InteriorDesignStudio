import { drizzle } from 'drizzle-orm/pg';
import { Pool } from 'pg';
import * as schema from './schema.js';

// Create a database connection pool
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Create a drizzle instance with the pool
export const db = drizzle(pool);