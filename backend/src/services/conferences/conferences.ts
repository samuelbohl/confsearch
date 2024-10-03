import { conferences, events, eventTrack } from "@api/db/schemas";
import { eq } from "drizzle-orm";
import { db } from "@api/db";
import { updateConferenceSchema } from "@api/services/conferences/schemas";

export async function getAStarConferences() {
  return db.select().from(conferences).where(eq(conferences.coreRank, "A*"));
}

export async function getAllConferences() {
  const results = await db
    .select()
    .from(conferences)
    .leftJoin(events, eq(conferences.acronym, events.conferenceAcronym))
    .leftJoin(eventTrack, eq(events.id, eventTrack.eventId));

  const structuredConferences: any[] = [];
  const conferenceMap = new Map<number, any>();

  for (const row of results) {
    if (!row.conferences) continue;

    let conference = conferenceMap.get(row.conferences.id);
    if (!conference) {
      conference = {
        ...row.conferences,
        events: [],
      };
      conferenceMap.set(row.conferences.id, conference);
      structuredConferences.push(conference);
    }

    if (row.events) {
      let event = conference.events.find((e: any) => e.id === row.events!.id);
      if (!event) {
        event = {
          ...row.events,
          eventTracks: [],
        };
        conference.events.push(event);
      }

      if (row.event_track) {
        event.eventTracks.push(row.event_track);
      }
    }
  }

  return structuredConferences;
}

export async function getConferenceById(conferenceId: number) {
  const results = await db
    .select()
    .from(conferences)
    .leftJoin(events, eq(conferences.acronym, events.conferenceAcronym))
    .leftJoin(eventTrack, eq(events.id, eventTrack.eventId))
    .where(eq(conferences.id, conferenceId));

  if (results.length === 0) {
    return null;
  }

  const structuredConference = {
    ...results[0]!.conferences!,
    events: [],
  };

  const eventMap = new Map<number, any>();

  for (const row of results) {
    if (row.events) {
      let event = eventMap.get(row.events.id);
      if (!event) {
        event = {
          ...row.events,
          eventTracks: [],
        };
        eventMap.set(row.events.id, event);
        // @ts-ignore
        structuredConference.events.push(event);
      }

      if (row.event_track) {
        event.eventTracks.push(row.event_track);
      }
    }
  }

  return structuredConference;
}

export async function updateConference(conferenceId: number, updateConferenceRequestBody: any) {
  const parsedEvent = updateConferenceSchema.parse(updateConferenceRequestBody);
  return db.update(conferences).set(parsedEvent).where(eq(conferences.id, conferenceId)).returning();
}

export async function deleteConference(conferenceId: number) {
  return db.delete(conferences).where(eq(conferences.id, conferenceId)).returning();
}
