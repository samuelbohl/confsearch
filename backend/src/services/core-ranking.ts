import { z } from "zod";
import csv from "csv-parser";
import axios from "axios";
import { db } from "@api/db";
import { conferences } from "@api/db/schemas";
import { sql } from "drizzle-orm";

const CORECsvSchema = z.object({
  id: z.string(),
  title: z.string(),
  acronym: z.string(),
  source: z.string(),
  rank: z.string(),
  note: z.string().optional(),
  dblp: z.string().optional(),
  "Primary FoR": z.string().optional(),
  comments: z.string().optional(),
  avg_rating: z.string().optional(),
});

type CoreRankingCSV = z.infer<typeof CORECsvSchema>;

export async function getCORERanking() {
  const url = "https://portal.core.edu.au/conf-ranks/";
  const params = {
    search: "",
    by: "all",
    sort: "title",
    do: "Export",
  };
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  };

  const response = await axios.get(url, {
    params,
    headers,
    responseType: "stream",
  });

  const results = [];
  const dataStream = response.data.pipe(
    csv({
      mapHeaders: ({ header }) => header.trim(),
      headers: ["id", "title", "acronym", "source", "rank"],
    }),
  );

  for await (const data of dataStream) {
    const parsed = CORECsvSchema.safeParse(data);
    if (parsed.success) {
      results.push(parsed.data);
    } else {
      console.error("Validation error:", parsed.error.errors);
    }
  }

  return results;
}

export async function upsertCoreRankings(rankings: CoreRankingCSV[]) {
  for (const ranking of rankings) {
    await db
      .insert(conferences)
      .values({
        id: parseInt(ranking.id),
        title: ranking.title,
        acronym: ranking.acronym,
        coreRank: ranking.rank,
        rankSource: ranking.source,
      })
      .onConflictDoUpdate({
        target: conferences.id,
        set: {
          title: ranking.title,
          acronym: ranking.acronym,
          coreRank: ranking.rank,
          rankSource: ranking.source,
        },
      });
  }

  await resetConferencesSequenceCounter();
}

async function resetConferencesSequenceCounter() {
  await db.execute(
    sql`SELECT setval(pg_get_serial_sequence('conferences', 'id'), coalesce(max(id),0) + 1, false) FROM conferences`,
  );
}
