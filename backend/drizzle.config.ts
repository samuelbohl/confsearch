import { defineConfig } from "drizzle-kit";
import { env } from "@api/utils";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schemas.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
