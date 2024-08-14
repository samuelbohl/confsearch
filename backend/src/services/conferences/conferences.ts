import { conferences, events, eventTrack } from "@api/db/schemas";
import { eq } from "drizzle-orm";
import { db } from "@api/db";
import { updateConferenceSchema } from "@api/services/conferences/schemas";

export async function getAStarConferences() {
  return db.select().from(conferences).where(eq(conferences.coreRank, "A*"));
}

export async function getAllConferences() {
  return db
    .select()
    .from(conferences)
    .leftJoin(events, eq(conferences.acronym, events.conference))
    .leftJoin(eventTrack, eq(events.id, eventTrack.eventId));
}

export async function getConferenceById(conferenceId: number) {
  return db
    .select()
    .from(conferences)
    .leftJoin(events, eq(conferences.acronym, events.conference))
    .leftJoin(eventTrack, eq(events.id, eventTrack.eventId))
    .where(eq(conferences.id, conferenceId));
}

export async function updateConference(conferenceId: number, updateConferenceRequestBody: any) {
  const parsedEvent = updateConferenceSchema.parse(updateConferenceRequestBody);
  return db.update(conferences).set(parsedEvent).where(eq(conferences.id, conferenceId)).returning();
}

export async function deleteConference(conferenceId: number) {
  return db.delete(conferences).where(eq(conferences.id, conferenceId)).returning();
}
