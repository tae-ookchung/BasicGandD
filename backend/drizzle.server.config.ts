import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export default defineConfig({
  schema: "./src/db_server/schema/*",
  dialect: "postgresql",
  out: "./drizzle_server",
  dbCredentials: {
    url: databaseUrl,
    ssl: process.env.SSL_CERT_FILE
      ? {
          rejectUnauthorized: false,
          ca: process.env.SSL_CERT_FILE,
        }
      : undefined,
  },
});