import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { openaiEventSchema } from "@api/services/scrape-engine/event-schema";
import { Logger } from "@api/utils";

const client = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function openaiParseEvent(context: string) {
  const completion = await client.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that generates JSON for conference events in the format: " +
          "{ 'acronym':  'CONFERENCE ACRONYM + YEAR (e.g. ICML 2024)', " +
          "'start': 'YYYY-MM-DD', 'end': 'YYYY-MM-DD', " +
          "'paper_submission_deadline': 'YYYY-MM-DD' or null, " +
          "'abstract_submission_deadline': 'YYYY-MM-DD' or null, " +
          "'notification_due': 'YYYY-MM-DD' or null, " +
          "'final_due': 'YYYY-MM-DD' or null, " +
          "'camera_ready': 'YYYY-MM-DD' or null, " +
          "'deadline_notes': 'Additional clarification regarding the submissions or deadline (only information that is not already in the description or other fields)' or null, " +
          "'description': 'Short description on the event', " +
          "'event_url': 'URL to the event page' or null, " +
          "'submission_url': 'URL to the submission page' or null, " +
          "'categories': []," +
          "'tags': [], Add as many tags and keywords as you can. Include all buzzwords and topics." +
          "'tracks' : [] Sometimes conferences have more than one track. If this is clearly indicated, list the different tracks. If the conference also has a workshop, then also add it as a track with is_workshop set to true. If no workshop or track is specified or just a single one, leave this as empty array." +
          " }. " +
          "Important: Give Date Data exclusively in the format YYYY-MM-DD.",
      },
      { role: "user", content: `Here is where the information for this JSON object comes from: ${context}.` },
    ],
    response_format: zodResponseFormat(openaiEventSchema, "eventResponse"),
  });

  const message = completion.choices[0]?.message;
  if (message?.parsed) {
    console.log(message.parsed);
    return message.parsed;
  } else {
    Logger.error("ERROR", String(message?.refusal));
    return {
      error: {
        message: "Error parsing event",
        details: message?.refusal,
      },
    };
  }
}
