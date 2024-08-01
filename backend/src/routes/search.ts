import type { FastifyInstance, FastifyRequest } from "fastify";
import { Logger } from "@api/utils";
import { searchEvents } from "@api/services/search";
import { httpErrors } from "@fastify/sensible";

export const searchRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request: FastifyRequest<{ Querystring: Record<string, string> }>, response) => {
    Logger.info("GET", request.url);

    if ("query" in request.query) {
      const result = await searchEvents(request.query.query);
      response.send({
        result,
      });
    }

    response.send(httpErrors.badRequest("Missing query parameter"));
  });

  done();
};
