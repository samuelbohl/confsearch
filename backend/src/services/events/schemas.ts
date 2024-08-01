import { z } from "zod";

const createTrackSchema = z.object({
  event_id: z.number(),
  name: z.string(),
  description: z.string(),
  paper_submission: z.string().datetime(),
  abstract_submission: z.string().datetime(),
  notification_due: z.string().datetime(),
  camera_ready_due: z.string().datetime(),
  deadlines_note: z.string(),
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
  paper_submission: z.string().datetime().nullable(),
  abstract_submission: z.string().datetime().nullable(),
  notification_due: z.string().datetime().nullable(),
  final_due: z.string().datetime().nullable(),
  camera_ready: z.string().datetime().nullable(),
  deadline_notes: z.string().url().nullable(),
  wikicfp_url: z.string().url().nullable(),
  event_url: z.string().url().nullable(),
  submission_url: z.string().url().nullable(),
  location: z.string(),
  tracks: z.array(createTrackSchema).default([]),
});

export { createEventSchema, createTrackSchema };
