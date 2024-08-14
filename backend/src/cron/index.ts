import { CronJob } from "cron";
import { Logger } from "@api/utils";
import { getCORERanking, upsertCoreRankings } from "@api/services/core-ranking";
import { getWikiCFPSeries, upsertWikiCFPSeries } from "@api/services/wikicfp/wikicfp-conferences";
import { getAStarConferenceEventsWikiCFP } from "@api/services/wikicfp/wikicfp-events";
import {
  getAllNotUpdatedConferenceEvents,
  updateEventFromLLMResponse,
  upsertAStarConferenceEvents,
} from "@api/services/events/events";
import { eventSchema } from "@api/services/scrape-engine/event-schema";
import { openaiParseEvent } from "@api/services/scrape-engine/openai-event-parser";
import { localPrepareWikicfp } from "@api/services/scrape-engine/prepare-wikicpf-event-page";

export const updateCoreRanking = new CronJob(
  "0 0 * * 0", // every Sunday at 0:00
  async function () {
    Logger.info("CRON", "Starting core ranking update");
    try {
      const rankings = await getCORERanking();
      await upsertCoreRankings(rankings);
    } catch (error) {
      Logger.error("CRON", String(error));
    }
  },
);

export const updateWikiCFPSeries = new CronJob(
  "15 0 * * 0", // every Sunday at 0:15
  async function () {
    Logger.info("CRON", "Starting wikicfp series update");
    try {
      const series = await getWikiCFPSeries();
      await upsertWikiCFPSeries(series);
    } catch (error) {
      Logger.error("CRON", String(error));
    }
  },
);

export const updateAStartEventsFromWikiCFP = new CronJob(
  "30 0 * * 0", // every Sunday at 0:30
  async function () {
    Logger.info("CRON", "Starting wikicfp event update");
    try {
      const events = await getAStarConferenceEventsWikiCFP();
      await upsertAStarConferenceEvents(events);
    } catch (error) {
      Logger.error("CRON", String(error));
    }
  },
);

export const parseNewWikicfpEventsWithLLM = new CronJob(
  "30 0 * * 1", // every Sunday at 0:30
  async function () {
    Logger.info("CRON", "Starting wikicfp event parsing");
    try {
      const events = await getAllNotUpdatedConferenceEvents();

      let i = 0;
      for (const event of events) {
        i++;
        if (!event.wikicfpUrl) {
          continue;
        }

        const start = new Date().getTime();
        const contentText = await localPrepareWikicfp(event.wikicfpUrl);
        const llmResult = await openaiParseEvent(contentText);
        if (typeof llmResult === "object" && "error" in llmResult) {
          Logger.error("ERROR", llmResult.error.message);
          continue;
        }

        const parsedEvent = eventSchema.parse(llmResult);
        await updateEventFromLLMResponse({ ...parsedEvent, acronym: event.eventAcronym! });
        const end = new Date().getTime();
        Logger.info("UPDATE", `Updated event ${event.eventAcronym} in ${end - start}ms`);
        Logger.info("CRON", `Parsed ${i} of ${events.length} (${((i / events.length) * 100).toFixed(2)}%)`);
      }
    } catch (error) {
      Logger.error("CRON", String(error));
    }
  },
);
