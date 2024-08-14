import { z } from "zod";
import { categoriesSchema } from "@api/services/scrape-engine/categories-schema";

const dateSchema = z
  .string()
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, {
    message: "Date must be in the format YYYY-MM-DD or an empty string",
  })
  .transform((val) => (val === "" ? null : val));

const eventTrackSchema = z.object({
  name: z.string(),
  description: z.string(),
  paper_submission: dateSchema.nullable(),
  abstract_submission: dateSchema.nullable(),
  notification_due: dateSchema.nullable(),
  camera_ready_due: dateSchema.nullable(),
  deadlines_note: z.string().nullable(),
  is_workshop: z.boolean(),
});

const eventSchema = z.object({
  acronym: z.string().describe("The acronym of the conference, including the year e.g. ICML 2024"),
  start: dateSchema.describe("YYYY-MM-DD"),
  end: dateSchema.describe("YYYY-MM-DD"),
  paper_submission_deadline: dateSchema.nullable().describe("YYYY-MM-DD"),
  abstract_submission_deadline: dateSchema.nullable().describe("YYYY-MM-DD or null"),
  notification_due: dateSchema.nullable().describe("YYYY-MM-DD or null"),
  final_due: dateSchema.nullable().describe("YYYY-MM-DD or null"),
  camera_ready: dateSchema.nullable().describe("YYYY-MM-DD or null"),
  deadline_notes: z
    .string()
    .nullable()
    .describe(
      "Additional clarification regarding the submissions or deadline (only information that is not already in the description or other fields)' or null",
    ),
  event_url: z.string().nullable().describe("URL to the event page' or null"),
  submission_url: z.string().nullable().describe("URL to the submission page' or null"),
  description: z.string().nullable().describe("Description of the event page' or null"),
  categories: categoriesSchema,
  tags: z
    .array(z.string())
    .transform((tags) => tags.map((tag) => tag.toLowerCase()))
    .describe("Tags for the event, all lowercase, include all buzzwords and topics"),
  tracks: z.array(eventTrackSchema).default([]),
});

type EventSchema = z.infer<typeof eventSchema>;

const openaiEventTrackSchema = z.object({
  name: z.string(),
  description: z.string(),
  paper_submission: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  abstract_submission: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  notification_due: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  camera_ready_due: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  deadlines_note: z
    .union([z.string(), z.null()])
    .describe(
      "Additional clarification regarding the submissions or deadline (only information that is not already in the description or other fields) or null",
    ),
  is_workshop: z.boolean(),
});

const openaiEventSchema = z.object({
  acronym: z.string().describe("The acronym of the conference, including the year e.g. ICML 2024"),
  start: z.string().describe("YYYY-MM-DD"),
  end: z.string().describe("YYYY-MM-DD"),
  paper_submission_deadline: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  abstract_submission_deadline: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  notification_due: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  final_due: z.string().describe("YYYY-MM-DD"),
  camera_ready: z.union([z.string(), z.null()]).describe("YYYY-MM-DD or null"),
  deadline_notes: z
    .union([z.string(), z.null()])
    .describe(
      "Additional clarification regarding the submissions or deadline (only information that is not already in the description or other fields) or null",
    ),
  event_url: z.union([z.string(), z.null()]).describe("URL to the event page or null"),
  submission_url: z.union([z.string(), z.null()]).describe("URL to the submission page or null"),
  description: z.union([z.string(), z.null()]).describe("Description of the event page or null"),
  categories: categoriesSchema,
  tags: z.array(z.string()).describe("Tags for the event, all lowercase, include all buzzwords and topics"),
  tracks: z.array(openaiEventTrackSchema),
});

export { eventSchema, dateSchema, openaiEventSchema, EventSchema };
