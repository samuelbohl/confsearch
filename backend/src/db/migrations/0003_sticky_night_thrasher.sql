ALTER TABLE "event_track" ALTER COLUMN "paper_submission" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event_track" ALTER COLUMN "abstract_submission" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event_track" ALTER COLUMN "notification_due" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "event_track" ALTER COLUMN "camera_ready_due" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "start" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "end" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "paper_submission" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "abstract_submission" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "final_due" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "camera_ready" SET DATA TYPE text;