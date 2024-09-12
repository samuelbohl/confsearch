import type { FastifyInstance, FastifyRequest } from "fastify";
import { Logger } from "@api/utils";
import { searchEvents } from "@api/services/search";

export const searchRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request: FastifyRequest<{ Querystring: Record<string, string> }>, response) => {
    Logger.info("GET", request.url);

    if ("query" in request.query) {
      const result = await searchEvents(request.query.query);
      response.send({
        data: result,
        error: null,
      });
    } else {
      response.status(400).send({
        data: null,
        error: {
          message: "Missing query parameter",
          details: null,
        },
      });
    }
  });

  done();
};
