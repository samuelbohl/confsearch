import { conferences } from "@api/db/schemas";
import { eq } from "drizzle-orm";
import { db } from "@api/db";

export async function getAStarConferences() {
  return db.select().from(conferences).where(eq(conferences.coreRank, "A*"));
}

export async function getAllConferences() {
  return db.select().from(conferences);
}
