import { z } from "zod";

export const updateConferenceSchema = z.object({
  id: z.number(),
  title: z.string(),
  acronym: z.string(),
  coreRank: z.string(),
  rankSource: z.string(),
  wikicfpUrl: z.string().nullable(),
  website: z.string().nullable(),
});
