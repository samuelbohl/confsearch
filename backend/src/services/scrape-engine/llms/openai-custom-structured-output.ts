import { encodingForModel } from "js-tiktoken";
import { generateObject, jsonObjectPrompt, openai, zodSchema } from "modelfusion";
import { eventSchema } from "@api/services/scrape-engine/event-schema";

async function openaiEventRequestCustomStructuredOutput(context: string) {
  const enc = encodingForModel("gpt-3.5-turbo");
  const encoded = enc.encode(context);
  console.log("CONTENT TOKENS:", encoded.length);

  const response = await generateObject({
    model: openai
      .ChatTextGenerator({
        model: "gpt-3.5-turbo",
        maxGenerationTokens: 1024,
        temperature: 0,
        api: openai.Api({
          apiKey: process.env.OPEN_API_KEY!,
        }),
      })
      .asObjectGenerationModel(jsonObjectPrompt.instruction()),

    schema: zodSchema(eventSchema),
    prompt: {
      system:
        "You are a helpful assistant that generates JSON for conference events in the format: " +
        "{ 'acronym':  'CONFERENCE ACRONYM + YEAR (e.g. ICML 2024)', " +
        "'start': 'YYYY-MM-DD', " +
        "'end': 'YYYY-MM-DD', " +
        "'paper_submission_deadline': 'YYYY-MM-DD' or null, " +
        "'abstract_submission_deadline': 'YYYY-MM-DD' or null, " +
        "'notification_due': 'YYYY-MM-DD' or null, " +
        "'final_due': 'YYYY-MM-DD' or null, " +
        "'camera_ready': 'YYYY-MM-DD' or null, " +
        "'deadline_notes': 'Additional clarification regarding the deadline' or null, " +
        "'description': 'Short description on the event', " +
        "'event_url': 'URL to the event page' or null, " +
        "'submission_url': 'URL to the submission page' or null, " +
        "'categories': [] }. " +
        "Important: Give Date Data exclusively in the format YYYY-MM-DD.",
      instruction: `Here is where the information for this JSON object comes from: ${context}.`,
    },
  });

  console.log(response);
  return response;
}
