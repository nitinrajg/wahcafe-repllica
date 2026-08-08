import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// ponytail: singleton postgres client for serverless — one connection pool per cold start
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { max: 5 });
export const db = drizzle(client, { schema });
