import { JSDOM } from "jsdom";
import { db } from "@api/db";
import { conferences } from "@api/db/schemas";
import { eq, inArray } from "drizzle-orm";
import { cleanUpConferenceName, completeURL } from "@api/services/wikicfp/utils";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

type WikiCFPSeries = {
  acronym: string;
  name: string;
  url: string;
}[];

export async function getWikiCFPSeries() {
  let series: WikiCFPSeries = [];
  for (let i = 0; i < ALPHABET.length; i++) {
    const letter = ALPHABET[i];
    // make a request to the wikicfp api for the letter
    console.log(`Fetching wikicfp series for letter ${letter}`);
    const response = await fetch(`http://www.wikicfp.com/cfp/series?t=c&i=${letter}`);
    const htmlText = await response.text();
    series = series.concat(extractWikiCFPSeries(htmlText));
  }

  return series;
}

function extractWikiCFPSeries(html: string): WikiCFPSeries {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // TODO make robuster later on
  const table = doc.querySelector('table[cellpadding="3"][cellspacing="1"]');
  if (!table) {
    throw new Error("Could not find table");
  }

  const rows = table.querySelectorAll("tr");

  if (!rows) {
    return [];
  }

  /**
   * <td align="left">
   * <a href="/cfp/program?id=160&amp;s=A-MOST&amp;f=Advances in Model-Based Software Testing">A-MOST</a> - Advances in Model-Based Software Testing  </td>
   */

  // @ts-ignore
  return Array.from(rows).map((row) => {
    // get link

    const link = row.querySelector("a");
    const url = completeURL(link?.getAttribute("href"));
    const acronym = link?.textContent;
    const name = cleanUpConferenceName(row.textContent);

    return {
      acronym,
      name,
      url,
    };
  });
}

export async function upsertWikiCFPSeries(series: WikiCFPSeries) {
  // Extract all acronyms from the series
  const acronyms = series.map((item) => item.acronym);

  // Fetch all existing conferences with matching acronyms in one query
  const existingConferences = await db
    .select({
      id: conferences.id,
      acronym: conferences.acronym,
    })
    .from(conferences)
    .where(inArray(conferences.acronym, acronyms));

  // Create a Map for quick lookup
  const conferenceMap = new Map(existingConferences.map((conf) => [conf.acronym, conf.id]));

  // Prepare batch update
  const updates = series
    .filter((item) => conferenceMap.has(item.acronym))
    .map((item) => ({
      id: Number(conferenceMap.get(item.acronym)),
      wikicfpUrl: item.url,
    }));

  // Perform batch update
  if (updates.length > 0) {
    await db.transaction(async (tx) => {
      for (const update of updates) {
        await tx.update(conferences).set({ wikicfpUrl: update.wikicfpUrl }).where(eq(conferences.id, update.id));
      }
    });
  }

  console.log(`Updated WikiCFP URLs for ${updates.length} conferences`);
  console.log(`Skipped ${series.length - updates.length} conferences not in database`);
}
