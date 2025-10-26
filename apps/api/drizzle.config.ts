import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be configured.');
}

export default {
  schema: './src/infra/database/schemas/*',
  out: './src/infra/database/migrations',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
