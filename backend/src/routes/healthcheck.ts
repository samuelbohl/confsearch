import { Logger } from "@api/utils";
import { FastifyInstance } from "fastify";

export const healthCheckRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    Logger.info("GET", request.url);
    response.send({
      status: "OK",
    });
  });

  done();
};
