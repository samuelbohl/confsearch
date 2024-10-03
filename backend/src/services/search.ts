import { and, eq, gte, inArray, InferSelectModel, sql } from "drizzle-orm";
import { conferences, events } from "@api/db/schemas";
import { db } from "@api/db";
import { Logger } from "@api/utils";

type SelectConferences = InferSelectModel<typeof conferences>;
type SelectEvents = InferSelectModel<typeof events>;

interface SearchResult {
  conference: SelectConferences;
  events: SelectEvents[];
}

export async function searchEvents(query: string): Promise<SearchResult[]> {
  const results = await db
    .select()
    .from(events)
    .where(
      sql`to_tsvector('english', 
      concat_ws(' ', 
        coalesce(${events.title}, ''),
        coalesce(${events.conference}, ''),
        coalesce(${events.eventAcronym}, ''),
        coalesce(${events.description}, ''),
        array_to_string(${events.tags}, ' ')
      )
    ) @@ plainto_tsquery('english', ${query})`,
    );

  Logger.info("DEBUG", `Search results length: ${results.length}`);
  const conferenceAcronyms = results.map((result) => result.conferenceAcronym!);

  const matchedConferences = await db
    .select()
    .from(conferences)
    .where(inArray(conferences.acronym, conferenceAcronyms));

  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const lastYearString = lastYear.toISOString().split("T")[0];
  const conferenceResults = await db
    .select({
      conference: conferences,
      event: events,
    })
    .from(conferences)
    .leftJoin(events, and(eq(conferences.acronym, events.conferenceAcronym), gte(events.start, lastYearString)))
    .where(inArray(conferences.acronym, conferenceAcronyms));

  const conferenceMap = new Map<string, SearchResult>();

  for (const conference of matchedConferences) {
    if (conference.acronym) {
      conferenceMap.set(conference.acronym, {
        conference,
        events: [],
      });
    }
  }

  // Add events to the conferences
  for (const result of conferenceResults) {
    if (result.event && result.conference.acronym) {
      conferenceMap.get(result.conference.acronym)!.events.push(result.event);
    }
  }

  return Array.from(conferenceMap.values());
}
