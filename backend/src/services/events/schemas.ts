import { z } from "zod";

const createTrackSchema = z.object({
  event_id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  paperSubmission: z.string().nullable(),
  abstractSubmission: z.string().nullable(),
  notificationDue: z.string().nullable(),
  cameraReadyDue: z.string().nullable(),
  deadlinesNote: z.string().nullable(),
  isWorkshop: z.boolean(),
});

const createEventSchema = z.object({
  title: z.string(),
  conference: z.string(),
  acronym: z.string(),
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  description: z.string(),
  paperSubmission: z.string().nullable(),
  abstractSubmission: z.string().nullable(),
  notificationDue: z.string().nullable(),
  finalDue: z.string().nullable(),
  cameraReady: z.string().nullable(),
  deadlineNotes: z.string().nullable(),
  wikicfpUrl: z.string().url().nullable(),
  eventUrl: z.string().url().nullable(),
  submissionUrl: z.string().url().nullable(),
  location: z.string(),
  tracks: z.array(createTrackSchema).default([]),
});

export { createEventSchema, createTrackSchema };
