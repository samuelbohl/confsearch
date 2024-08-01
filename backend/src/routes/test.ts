import type { FastifyInstance } from "fastify";
import { Logger } from "@api/utils";
import { getCORERanking, upsertCoreRankings } from "@api/services/core-ranking";
import { getWikiCFPSeries, upsertWikiCFPSeries } from "@api/services/wikicfp/wikicfp-conferences";
import {
  getEmptyAStarConferenceEvents,
  updateEventFromLLMResponse,
  upsertAStarConferenceEvents,
} from "@api/services/events/events";
import { getAStarConferenceEventsWikiCFP } from "@api/services/wikicfp/wikicfp-events";
import { llamaEventRequest } from "@api/services/scrape-engine/llama-event-request";
import { localPrepareWikicfp } from "@api/services/scrape-engine/prepare-wikicpf-event-page";

export const testRoutes = (fastify: FastifyInstance, _: unknown, done: () => void) => {
  fastify.get("/", async (request, response) => {
    Logger.info("GET", request.url);
    try {
      const results = await getCORERanking();
      await upsertCoreRankings();

      response.send(results);
    } catch (error) {
      Logger.error(error);
      response.status(500).send({ error: "Failed to download and parse CSV" });
    }
  });

  fastify.get("/wikicfp", async (request, response) => {
    Logger.info("GET", request.url);

    const series = await getWikiCFPSeries();
    await upsertWikiCFPSeries(series);
    response.send({
      series,
    });
  });

  fastify.get("/parse", async (request, response) => {
    const url = "http://www.wikicfp.com/cfp/servlet/event.showcfp?eventid=8238&copyownerid=9141";

    try {
      const content = await localPrepareWikicfp(url);
      response.send(content);
    } catch (error) {
      Logger.error(error);
      response.status(500).send({ error: "Failed to download and parse HTML" });
    }
  });

  fastify.get("/wikicfp/events", async (request, response) => {
    Logger.info("GET", request.url);

    const events = await getAStarConferenceEventsWikiCFP();
    await upsertAStarConferenceEvents(events);
    response.send({
      events,
    });
  });

  fastify.get("/parse-events", async (request, response) => {
    Logger.info("GET", request.url);

    const events = await getEmptyAStarConferenceEvents();
    const firstEvent = events[0];

    if (!firstEvent) {
      response.status(404).send({ error: "No events found" });
      return;
    }

    if (!firstEvent.wikicfpUrl) {
      response.status(404).send({ error: "No wikicfpUrl found" });
      return;
    }

    let i = 0;
    for (const event of events) {
      i++;
      if (!event.wikicfpUrl) {
        continue;
      }

      const start = new Date().getTime();
      console.log("PREPARING:", event.wikicfpUrl);
      const contentText = await localPrepareWikicfp(event.wikicfpUrl);
      console.log("PREPARED LENGTH:", contentText.length);
      const llmResult = await llamaEventRequest(contentText);
      await updateEventFromLLMResponse({ ...llmResult, acronym: event.eventAcronym! });
      const end = new Date().getTime();
      Logger.info("UPDATE", `Updated event ${event.eventAcronym} in ${end - start}ms`);
      console.log("INFO", ` Parsed ${i} of ${events.length} (${((i / events.length) * 100).toFixed(2)}%)`);
    }

    response.send({ success: "DONE" });
  });

  done();
};
