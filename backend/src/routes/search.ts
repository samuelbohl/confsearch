import type { FastifyInstance } from "fastify";
import {Logger} from "@api/utils";

export const searchRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    Logger.info("GET", JSON.stringify(request.query));

    response.send({
      result: []
    });
  });

  done();
};
