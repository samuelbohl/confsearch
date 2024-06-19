import {InferSelectModel, sql} from "drizzle-orm";
import {events} from "@api/db/schemas";
import {db} from "@api/db";
import { Logger } from "@api/utils";

type SelectEvents = InferSelectModel<typeof events>;

export async function searchEvents(query: string): Promise<SelectEvents[]> {
  const results = await db.select().from(events).where(
    sql`to_tsvector('english', coalesce(${events.title}, '') || ' ' || coalesce(${events.conference}, '') || ' ' || coalesce(${events.acronym}, '') || ' ' || coalesce(${events.description}, '') || ' ' || array_to_string(${events.tags}, ' ')) @@ to_tsquery('english', ${query})`
  );

  Logger.info("DEBUG", `Search results length: ${results.length}`);

  return results;
}