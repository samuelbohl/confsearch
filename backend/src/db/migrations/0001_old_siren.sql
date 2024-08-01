ALTER TABLE "events" RENAME COLUMN "acronym" TO "conference_acronym";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_acronym" text;