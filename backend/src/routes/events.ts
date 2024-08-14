import type { FastifyInstance, FastifyRequest } from "fastify";
import { Logger } from "@api/utils";
import { addNewEvent, getAllConferenceEvents, getEventById, updateEvent } from "@api/services/events/events";

export const eventsRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    Logger.info("GET", request.url);

    try {
      const result = await getAllConferenceEvents();
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error getting events",
          details: error?.message,
        },
      });
    }
  });

  fastify.post("/", async (request, response) => {
    Logger.info("POST", request.url);

    try {
      const result = await addNewEvent(request.body);
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error adding event",
          details: error?.message,
        },
      });
    }
  });

  fastify.get("/:eventId", async (request: FastifyRequest<{ Params: { eventId: number } }>, response) => {
    Logger.info("GET", request.url);

    if (!("eventId" in request.params)) {
      response.status(400).send({
        error: {
          message: "Missing eventId parameter",
        },
      });
      return;
    }

    try {
      const result = await getEventById(request.params.eventId);
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error getting event",
          details: error?.message,
        },
      });
    }
  });

  fastify.put("/:eventId", async (request: FastifyRequest<{ Params: { eventId: number } }>, response) => {
    Logger.info("PUT", request.url);
    if (!("eventId" in request.params)) {
      response.status(400).send({
        error: {
          message: "Missing eventId parameter",
        },
      });
      return;
    }

    try {
      const result = await updateEvent(request.params.eventId, request.body);
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error updating event",
          details: error?.message,
        },
      });
    }
  });

  fastify.delete("/:eventId", async (request: FastifyRequest<{ Params: { eventId: string } }>, response) => {
    Logger.info("DELETE", request.url);

    if (!("eventId" in request.params)) {
      response.status(400).send({
        error: {
          message: "Missing eventId parameter",
        },
      });
      return;
    }

    // TODO MAYBE ADD THIS LATER, BUT SKIP THIS BECAUSE OF POTENTIAL ABUSE

    response.send({
      data: {
        success: true,
      },
    });
  });

  done();
};
