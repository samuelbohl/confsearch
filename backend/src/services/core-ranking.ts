import { z } from "zod";
import csv from "csv-parser";
import axios from "axios";

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

export async function getCORERanking() {
  const url = "https://portal.core.edu.au/conf-ranks/";
  const params = {
    "search": "",
    "by": "all",
    "sort": "title",
    "do": "Export",
  };
  const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  };

  const response = await axios.get(url, {
    params,
    headers,
    responseType: "stream",
  });

  const results = [];
  const dataStream = response.data.pipe(csv({
    mapHeaders: ({ header }) => header.trim(),
    headers: [
      "id",
      "title",
      "acronym",
      "source",
      "rank"
    ],
  }));

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