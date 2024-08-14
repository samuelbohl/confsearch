import { Logger } from "@api/utils";
import { FastifyInstance, type FastifyRequest } from "fastify";
import { getAllConferences, getConferenceById, updateConference } from "@api/services/conferences/conferences";

export const conferencesRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    Logger.info("GET", request.url);

    try {
      const result = await getAllConferences();
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error getting conferences",
          details: error?.message,
        },
      });
    }
  });

  fastify.get("/:conferenceId", async (request: FastifyRequest<{ Params: { conferenceId: number } }>, response) => {
    Logger.info("GET", request.url);
    if (!("conferenceId" in request.params)) {
      response.status(400).send({
        error: {
          message: "Missing conferenceId parameter",
        },
      });
      return;
    }

    try {
      const result = await getConferenceById(request.params.conferenceId);
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error getting conference",
          details: error?.message,
        },
      });
    }
  });

  fastify.put("/:conferenceId", async (request: FastifyRequest<{ Params: { conferenceId: number } }>, response) => {
    Logger.info("PUT", request.url);
    if (!("conferenceId" in request.params)) {
      response.status(400).send({
        error: {
          message: "Missing conferenceId parameter",
        },
      });
      return;
    }

    try {
      const result = await updateConference(request.params.conferenceId, request.body);
      response.send({
        data: result,
      });
    } catch (error: Error | any) {
      response.status(400).send({
        error: {
          message: "Error updating conference",
          details: error?.message,
        },
      });
    }
  });

  fastify.delete("/:conferenceId", async (request: FastifyRequest<{ Params: { conferenceId: number } }>, response) => {
    Logger.info("DELETE", request.url);
    if (!("conferenceId" in request.params)) {
      response.status(400).send({
        error: {
          message: "Missing conferenceId parameter",
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
