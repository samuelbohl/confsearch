import { inArray, InferSelectModel, sql } from "drizzle-orm";
import { conferences, events } from "@api/db/schemas";
import { db } from "@api/db";
import { Logger } from "@api/utils";

type SelectConferences = InferSelectModel<typeof conferences>;

export async function searchEvents(query: string): Promise<SelectConferences[]> {
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
  return db.select().from(conferences).where(inArray(conferences.acronym, conferenceAcronyms));
}
