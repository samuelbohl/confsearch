import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
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
  start: text("start"),
  end: text("end"),
  categories: text("categories")
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  tags: text("tags")
    .array()
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  description: text("description"),
  paperSubmission: text("paper_submission"),
  abstractSubmission: text("abstract_submission"),
  notificationDue: text("notification_due"),
  finalDue: text("final_due"),
  cameraReady: text("camera_ready"),
  deadlineNotes: text("deadline_notes"),
  wikicfpUrl: text("wikicfp_url"),
  eventUrl: text("event_url"),
  submissionUrl: text("submission_url"),
  location: text("location"),
  updatedAt: timestamp("updated_at"),
});

// EventTrack Table
export const eventTrack = pgTable("event_track", {
  id: serial("id").primaryKey(),
  eventId: serial("event_id").references(() => events.id, { onUpdate: "cascade", onDelete: "set null" }),
  name: text("name"),
  description: text("description"),
  paperSubmission: text("paper_submission"),
  abstractSubmission: text("abstract_submission"),
  notificationDue: text("notification_due"),
  cameraReadyDue: text("camera_ready_due"),
  deadlinesNote: text("deadlines_note"),
  isWorkshop: boolean("is_workshop"),
});
