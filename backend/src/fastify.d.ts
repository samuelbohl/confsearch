import type { db } from "./db";

declare module "fastify" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyRequest {
    db: typeof db;
  }
}
