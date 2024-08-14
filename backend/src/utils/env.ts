import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  DATABASE_URL: z.string().default("postgres://confsearch:confsearch@127.0.0.1:5432/confsearch"),
  PORT: z.coerce.number().default(8080),
  HOST: z.string().default("127.0.0.1"),
});

export const env = envSchema.parse(process.env);
