import { db } from "@api/db";
import { events, eventTrack } from "@api/db/schemas";
import { AStarConferenceEvent } from "@api/services/wikicfp/wikicfp-events";
import { eq, isNull } from "drizzle-orm";
import { EventSchema } from "@api/services/scrape-engine/event-schema";
import { createEventSchema } from "@api/services/events/schemas";
import { ZodError } from "zod";

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

export async function getAllNotUpdatedConferenceEvents() {
  return db.select().from(events).where(isNull(events.updatedAt));
}

export async function updateEventFromLLMResponse(llamaResponse: EventSchema) {
  return await db.transaction(async (tx) => {
    // Update main event information
    const [updatedEvent] = await tx
      .update(events)
      .set({
        abstractSubmission: llamaResponse.abstract_submission_deadline,
        notificationDue: llamaResponse.notification_due,
        paperSubmission: llamaResponse.paper_submission_deadline,
        finalDue: llamaResponse.final_due,
        cameraReady: llamaResponse.camera_ready,
        deadlineNotes: llamaResponse.deadline_notes,
        description: llamaResponse.description,
        eventUrl: llamaResponse.event_url,
        submissionUrl: llamaResponse.submission_url,
        categories: llamaResponse.categories,
        start: llamaResponse.start,
        end: llamaResponse.end,
        tags: llamaResponse.tags,
        updatedAt: new Date(),
      })
      .where(eq(events.eventAcronym, llamaResponse.acronym))
      .returning({ id: events.id });

    if (!updatedEvent) {
      throw new Error(`Event with acronym ${llamaResponse.acronym} not found`);
    }

    // Delete existing tracks for this event
    await tx.delete(eventTrack).where(eq(eventTrack.eventId, updatedEvent.id));

    // Insert new tracks
    for (const track of llamaResponse.tracks) {
      await tx.insert(eventTrack).values({
        eventId: updatedEvent.id,
        name: track.name,
        description: track.description,
        paperSubmission: track.paper_submission,
        abstractSubmission: track.abstract_submission,
        notificationDue: track.notification_due,
        cameraReadyDue: track.camera_ready_due,
        deadlinesNote: track.deadlines_note,
        isWorkshop: track.is_workshop,
      });
    }

    return updatedEvent;
  });
}

export async function addNewEvent(newEventRequestBody: any) {
  try {
    const parsedRequest = createEventSchema.parse(newEventRequestBody);
    const res = await db.insert(events).values(parsedRequest).returning();
    return res[0]?.id;
  } catch (error) {
    if (error instanceof ZodError) {
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

export async function updateEvent(eventId: number, updateEventRequestBody: any) {
  try {
    const parsedRequest = createEventSchema.parse(updateEventRequestBody);
    return await db.update(events).set(parsedRequest).where(eq(events.id, eventId));
  } catch (error) {
    if (error instanceof ZodError) {
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

export async function deleteEventById(eventId: number) {
  return db.delete(events).where(eq(events.id, eventId)).returning();
}
