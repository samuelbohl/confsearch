import { pgTable, serial, text, date, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Conferences Table
export const conferences = pgTable("conferences", {
  id: serial("id").primaryKey(),
  title: text("title"),
  acronym: text("acronym"),
  coreRank: text("core_rank"),
  rankSource: text("rank_source"),
  wikicfpUrl: text("wikicfp_url"),
  website: text("website"),
});

// Events Table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title"),
  conference: text("conference"),
  conferenceAcronym: text("conference_acronym"),
  eventAcronym: text("event_acronym"),
  start: date("start"),
  end: date("end"),
  categories: text("categories")
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  tags: text("tags")
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  description: text("description"),
  paperSubmission: timestamp("paper_submission", { withTimezone: false }),
  abstractSubmission: timestamp("abstract_submission", { withTimezone: false }),
  notificationDue: timestamp("notification_due", { withTimezone: false }),
  finalDue: timestamp("final_due", { withTimezone: false }),
  cameraReady: timestamp("camera_ready", { withTimezone: false }),
  deadlineNotes: text("deadline_notes"),
  wikicfpUrl: text("wikicfp_url"),
  eventUrl: text("event_url"),
  submissionUrl: text("submission_url"),
  location: text("location"),
});

// EventTrack Table
export const eventTrack = pgTable("event_track", {
  id: serial("id").primaryKey(),
  eventId: serial("event_id").references(() => events.id, { onUpdate: "cascade", onDelete: "set null" }),
  name: text("name"),
  description: text("description"),
  paperSubmission: timestamp("paper_submission", { withTimezone: false }),
  abstractSubmission: timestamp("abstract_submission", { withTimezone: false }),
  notificationDue: timestamp("notification_due", { withTimezone: false }),
  cameraReadyDue: timestamp("camera_ready_due", { withTimezone: false }),
  deadlinesNote: text("deadlines_note"),
});
