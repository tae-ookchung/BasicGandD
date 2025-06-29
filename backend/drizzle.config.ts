import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/*",
  dialect: "postgresql",
  out: "./drizzle",
});