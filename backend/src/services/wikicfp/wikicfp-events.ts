import { JSDOM } from "jsdom";
import { cleanUpEventName, completeURL } from "@api/services/wikicfp/utils";
import { getAStarConferences } from "@api/services/conferences/conferences";

type WikiCFPEvent = {
  eventAcronym: string;
  name: string;
  url: string;
  location: string;
};

export async function getWikiCFPEventsFromURL(url: string) {
  let events: WikiCFPEvent[] = [];
  const response = await fetch(url);
  const htmlText = await response.text();
  events = events.concat(extractWikiCFPEvents(htmlText));

  return events;
}

function extractWikiCFPEvents(html: string): WikiCFPEvent[] {
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
   * <tr bgcolor="#f6f6f6">
   * <td rowspan="2" align="left"><a href="/cfp/servlet/event.showcfp?eventid=176522&amp;copyownerid=1">ICML 2024</a></td>
   * <td align="left" colspan="3">International Conference on Machine Learning</td></tr>
   * <tr bgcolor="#f6f6f6">
   * <td align="left">Jul 21, 2024 - Jul 27, 2024</td>
   * <td align="left">Vienna, Austria</td>
   * <td align="left">TBD</td>
   * </tr>
   */

  // skip header
  const rowsWithoutHeader = Array.from(rows).slice(1);

  let events: WikiCFPEvent[] = [];
  for (let i = 0; i < rowsWithoutHeader.length; i += 2) {
    const row = rowsWithoutHeader[i];
    const nextRow = rowsWithoutHeader[i + 1];

    const eventAcronym = row?.querySelector("a")?.textContent;
    const name = cleanUpEventName(row?.textContent);
    const url = completeURL(row?.querySelector("a")?.getAttribute("href"));

    if (eventAcronym && name && url) {
      events.push({
        eventAcronym,
        name,
        url,
        location: nextRow?.querySelector("td:nth-child(2)")?.textContent || "TBD",
      });
    }
  }

  return events;
}

export type AStarConferenceEvent = {
  conferenceAcronym: string | null;
  eventAcronym: string;
  title: string;
  wikicfpUrl: string;
  location: string;
};

export async function getAStarConferenceEventsWikiCFP() {
  const conferences = await getAStarConferences();

  let conferenceEvents: AStarConferenceEvent[] = [];
  for (const conference of conferences) {
    if (conference.wikicfpUrl) {
      const events = await getWikiCFPEventsFromURL(conference.wikicfpUrl);
      const confEvents = events.map((event) => ({
        conferenceAcronym: conference.acronym,
        eventAcronym: event.eventAcronym,
        title: event.name,
        wikicfpUrl: event.url,
        location: event.location,
      }));

      conferenceEvents = conferenceEvents.concat(confEvents);
    }
  }

  return conferenceEvents;
}
