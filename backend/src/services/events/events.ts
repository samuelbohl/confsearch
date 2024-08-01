import { db } from "@api/db";
import { events, eventTrack } from "@api/db/schemas";
import { AStarConferenceEvent } from "@api/services/wikicfp/wikicfp-events";
import { eq, isNull } from "drizzle-orm";
import { EventSchema } from "@api/services/scrape-engine/event-schema";
import { createEventSchema } from "@api/services/events/schemas";

export async function upsertAStarConferenceEvents(aStarEvents: AStarConferenceEvent[]) {
  const existingEvents = await db.select().from(events);
  const existingEventAcronyms = existingEvents.map((event) => event.eventAcronym);

  const eventsToInsert = aStarEvents.filter((event) => !existingEventAcronyms.includes(event.eventAcronym));

  return db.transaction(async (tx) => {
    for (const event of eventsToInsert) {
      // only insert if it doesn't already exist
      await tx.insert(events).values({
        title: event.title,
        conference: event.conferenceAcronym,
        conferenceAcronym: event.conferenceAcronym,
        eventAcronym: event.eventAcronym,
        location: event.location,
        wikicfpUrl: event.wikicfpUrl,
      });
    }
  });
}

export async function getAllConferenceEvents() {
  return db.select().from(events);
}

export async function getEmptyAStarConferenceEvents() {
  return db.select().from(events).where(isNull(events.description));
}

function dateOrNull(date: string | null) {
  if (date) {
    return new Date(date);
  }
  return null;
}

export async function updateEventFromLLMResponse(llamaResponse: EventSchema) {
  return db
    .update(events)
    .set({
      abstractSubmission: dateOrNull(llamaResponse.abstract_submission_deadline),
      notificationDue: dateOrNull(llamaResponse.notification_due),
      paperSubmission: dateOrNull(llamaResponse.paper_submission_deadline),
      finalDue: dateOrNull(llamaResponse.final_due),
      cameraReady: dateOrNull(llamaResponse.camera_ready),
      deadlineNotes: dateOrNull(llamaResponse.deadline_notes),
      description: llamaResponse.description,
      eventUrl: llamaResponse.event_url,
      submissionUrl: llamaResponse.submission_url,
      categories: llamaResponse.categories,
      start: llamaResponse.start,
      end: llamaResponse.end,
    })
    .where(eq(events.eventAcronym, llamaResponse.acronym));
}

export async function addNewEvent(newEventRequestBody: any) {
  try {
    const parsedRequest = createEventSchema.parse(newEventRequestBody);
    const res = await db.insert(events).values(parsedRequest).returning();
    return res.id;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: "Request has invalid schema",
          details: error.issues,
        },
      };
    }

    return {
      error,
    };
  }
}

export async function getEventById(eventId: number) {
  return db.select().from(events).leftJoin(eventTrack, eq(events.id, eventTrack.eventId)).where(eq(events.id, eventId));
}
