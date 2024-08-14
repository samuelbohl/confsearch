import { generateObject, jsonObjectPrompt, ollama, zodSchema } from "modelfusion";
import { eventSchema } from "@api/services/scrape-engine/event-schema";

async function ollamaLlamaEventRequest(context: string) {
  console.log("OLLAMA");
  const response = await generateObject({
    model: ollama
      .ChatTextGenerator({
        model: "llama3.1:8b-instruct-fp16",
        maxGenerationTokens: 1024,
        temperature: 0,
        api: ollama.Api({
          baseUrl: "http://localhost:11434",
        }),
      })
      .asObjectGenerationModel(jsonObjectPrompt.instruction()),

    schema: zodSchema(eventSchema),
    prompt: {
      system:
        "You are a helpful assistant that generates JSON for conference events in the format: { 'acronym':  'CONFERENCE ACRONYM + YEAR (e.g. ICML 2024)', 'start': 'YYYY-MM-DD', 'end': 'YYYY-MM-DD', 'paper_submission_deadline': 'YYYY-MM-DD' or null, 'abstract_submission_deadline': 'YYYY-MM-DD' or null, 'notification_due': 'YYYY-MM-DD' or null }. Important: Give Date Data exclusively in the format YYYY-MM-DD. And only provide the information requested in the JSON format. No redundant information.",
      instruction: `Here is where the information for this JSON object comes from: ${context}.`,
    },
  });

  console.log(response);
  return response;
}
