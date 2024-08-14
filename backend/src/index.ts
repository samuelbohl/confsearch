import { initDb } from "@api/db";
import { eventsRoutes, searchRoutes } from "@api/routes";
import { env, Logger } from "@api/utils";
import fastify from "fastify";
import { middleware } from "./modules/middleware";
import { healthCheckRoutes } from "@api/routes/healthcheck";
import { updateCoreRanking, updateWikiCFPSeries } from "@api/cron";

// eslint-disable-next-line @typescript-eslint/naming-convention
const API_VERSION = "v1";

export const main = async () => {
  const server = fastify({
    bodyLimit: 1_000_000,
    trustProxy: true,
  });

  await initDb();

  server.register(middleware);
  server.register(import("@fastify/cors"), {
    maxAge: 600,
    origin: true,
    credentials: true,
  });

  // Routes
  server.register(searchRoutes, {
    prefix: `/api/${API_VERSION}/search`,
  });
  server.register(eventsRoutes, {
    prefix: `/api/${API_VERSION}/events`,
  });
  server.register(healthCheckRoutes, {
    prefix: `/api/${API_VERSION}/health`,
  });

  server.listen({ host: env.HOST, port: env.PORT }, (error, address) => {
    if (error) {
      Logger.error("INIT", error.message);
      throw new Error(error.message);
    }

    Logger.info("INIT", `Server listening at ${address}`);
  });

  // CRON JOBS
  updateCoreRanking.start();
  updateWikiCFPSeries.start();

  return server;
};

main();
