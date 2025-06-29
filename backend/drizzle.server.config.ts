import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db_server/schema/*",
  dialect: "postgresql",
  out: "./drizzle_server",
});