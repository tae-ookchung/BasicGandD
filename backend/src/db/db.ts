// Import Drizzle and PostgreSQL client
import { drizzle } from 'drizzle-orm/node-postgres';
import * as pgc from 'drizzle-orm/pg-core';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Configure PostgreSQL client
const pool = new pg.Pool({
  host: process.env.db_host,            // Database host
  database: process.env.db_name,    // Database name
  user: process.env.db_username,            // PostgreSQL username
  password: process.env.db_password,    // Database password
  port: 5432,                   // PostgreSQL port
  ssl: {
    rejectUnauthorized: false // To change
  }
});

(async () => {
  const res = await pool.query('SELECT NOW()');
  console.log(res);
})();

// Connect Drizzle to the PostgreSQL client
const db = drizzle(pool);

const EXAMPLETEST = pgc.pgTable("exampletest", { // to remove
  testc1:pgc.varchar('testc1'),
  testc2:pgc.integer('testc2'),
  testc3:pgc.integer('testc3'),
})

export {db,EXAMPLETEST}



// await db.insert(users).values({
//   name: ' Rianne Nika',
//   email: 'rianne.nika@example.com',
// });