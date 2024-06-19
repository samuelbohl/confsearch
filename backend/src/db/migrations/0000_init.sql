CREATE TABLE IF NOT EXISTS "conferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"acronym" text,
	"core_rank" text,
	"rank_source" text,
	"wikicfp_url" text,
	"website" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_track" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" serial NOT NULL,
	"name" text,
	"description" text,
	"paper_submission" timestamp,
	"abstract_submission" timestamp,
	"notification_due" timestamp,
	"camera_ready_due" timestamp,
	"deadlines_note" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"conference" text,
	"acronym" text,
	"start" date,
	"end" date,
	"categories" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"description" text,
	"paper_submission" timestamp,
	"abstract_submission" timestamp,
	"notification_due" timestamp,
	"final_due" timestamp,
	"camera_ready" timestamp,
	"deadline_notes" text,
	"wikicfp_url" text,
	"event_url" text,
	"submission_url" text,
	"location" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_track" ADD CONSTRAINT "event_track_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
