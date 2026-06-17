import { drizzle } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export const db = drizzle(process.env.DATABASE_URL);
