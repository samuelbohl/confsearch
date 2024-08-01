import { z } from "zod";

const convertToYYYYMMDD = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  return date.toISOString().split("T")[0]; // This returns YYYY-MM-DD
};

const dateSchema = z.preprocess(
  (arg) => {
    if (typeof arg === "string") {
      try {
        return convertToYYYYMMDD(arg);
      } catch {
        return arg; // If conversion fails, pass the original string to be validated
      }
    }
    return arg;
  },
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Date must be in the format YYYY-MM-DD",
    })
    .refine(
      (date) => {
        const [year, month, day] = date.split("-").map(Number);
        const dateObj = new Date(year, month - 1, day);
        return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
      },
      {
        message: "Invalid date",
      },
    ),
);

const eventSchema = z.object({
  acronym: z.string(),
  start: dateSchema,
  end: dateSchema,
  paper_submission_deadline: dateSchema.nullable(),
  abstract_submission_deadline: dateSchema.nullable(),
  notification_due: dateSchema.nullable(),
  final_due: dateSchema.nullable(),
  camera_ready: dateSchema.nullable(),
  deadline_notes: dateSchema.nullable(),
  event_url: z.string().nullable(),
  submission_url: z.string().nullable(),
  description: z.string(),
  categories: z.array(z.string()).transform((categories) => categories.map((category) => category.toLowerCase())),
});

type EventSchema = z.infer<typeof eventSchema>;

export { eventSchema, dateSchema, EventSchema };
