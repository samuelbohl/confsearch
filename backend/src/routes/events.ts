import type { FastifyInstance, FastifyRequest } from "fastify";
import { Logger } from "@api/utils";
import { addNewEvent, getAllConferenceEvents, getEventById } from "@api/services/events/events";

export const eventsRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request: FastifyRequest<{ Querystring: Record<string, string> }>, response) => {
    Logger.info("GET", request.url);

    const result = await getAllConferenceEvents();
    response.send({
      result,
    });
  });

  fastify.post("/", async (request, response) => {
    Logger.info("POST", request.url);
    const result = await addNewEvent(request.body);

    if ("error" in result) {
      response.status(400).send(result.error);
      return;
    }

    response.send({
      success: true,
    });
  });

  fastify.get("/:eventId", async (request: FastifyRequest<{ Params: { eventId: string } }>, response) => {
    Logger.info("GET", request.url);
    const eventId = parseInt(request.params.eventId);
    const result = await getEventById(eventId);
    response.send({
      result,
    });
  });

  fastify.put("/:eventId", async (request, response) => {
    LOGGER.info("PUT", request.url);
    const eventId = parseInt(request.params.eventId);
    // TODO

    response.send({
      success: true,
    });
  });

  fastify.delete("/:eventId", async (request, response) => {
    Logger.info("DELETE", request.url);
    const eventId = parseInt(request.params.eventId);
    // TODO

    response.send({
      success: true,
    });
  });

  done();
};
