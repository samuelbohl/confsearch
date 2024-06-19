import type { FastifyInstance } from "fastify";
import { Logger } from "@api/utils";
import { getCORERanking } from "@api/services/core-ranking";

export const testRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    Logger.info("GET", request.url);
    try {
      const results = await getCORERanking();
      response.send(results);

    } catch (error) {
      Logger.error(error);
      response.status(500).send({ error: 'Failed to download and parse CSV' });
    }
  });

  done();
};
