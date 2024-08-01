import OpenAI from "openai";
import { generateObject, jsonObjectPrompt, ollama, openai, zodSchema } from "modelfusion";
import { EventSchema, eventSchema } from "@api/services/scrape-engine/event-schema";
import { isString } from "@api/utils/date";
import { encodingForModel } from "js-tiktoken";

async function nvidiaLlamaEventRequest(context: string) {
  const openai = new OpenAI({
    apiKey: process.env.NVIDIA_KEY,
    baseURL: process.env.NVIDIA_ENDPOINT,
  });

  const completion = await openai.chat.completions.create({
    model: "meta/llama-3.1-8b-instruct",
    messages: [
      {
        role: "user",
        content: `Only output strict JSON in the form and content that is specified: { 'acronym': 'CONFERENCE ACRONYM (INCLUDING YEAR)', 'start': 'YYYY-MM-DD', 'end': 'YYYY-MM-DD', 'paper_submission_deadline': 'YYYY-MM-DD', 'abstract_submission_deadline': 'YYYY-MM-DD', 'notification_due': 'YYYY-MM-DD' }. Here is where the information for this JSON object comes from: ${context}. Again: ONLY PROVIDE THE JSON OUTPUT OF HTE REQUESTED INFORMATION. NOTHING ELSE EXCEPT THE JSON!`,
      },
    ],
    temperature: 0,
    max_tokens: 1024,
    stream: false,
  });

  return completion.choices[0]?.message.content || "";
}

async function openaiEventRequestMf(context: string) {
  const enc = encodingForModel("gpt-3.5-turbo");
  const encoded = enc.encode(context);
  console.log("CONTENT TOKENS:", encoded.length);

  console.log("OPENAI");
  const response = await generateObject({
    model: openai
      .ChatTextGenerator({
        model: "gpt-3.5-turbo",
        maxGenerationTokens: 1024,
        temperature: 0,
        api: openai.Api({
          apiKey: process.env.OPEN_API_KEY,
        }),
      })
      .asObjectGenerationModel(jsonObjectPrompt.instruction()),

    schema: zodSchema(eventSchema),
    prompt: {
      system:
        "You are a helpful assistant that generates JSON for conference events in the format: " +
        "{ 'acronym':  'CONFERENCE ACRONYM + YEAR (e.g. ICML 2024)', " +
        "'start': 'YYYY-MM-DD', 'end': 'YYYY-MM-DD', " +
        "'paper_submission_deadline': 'YYYY-MM-DD' or null, " +
        "'abstract_submission_deadline': 'YYYY-MM-DD' or null, " +
        "'notification_due': 'YYYY-MM-DD' or null, " +
        "'final_due': 'YYYY-MM-DD' or null, " +
        "'camera_ready': 'YYYY-MM-DD' or null, " +
        "'deadline_notes': 'YYYY-MM-DD' or null, " +
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

async function ollamaLlamaEventRequest(context: string) {
  console.log("OLLAMA");
  const response = await generateObject({
    model: ollama
      .ChatTextGenerator({
        model: "llama3.1:8b-instruct-fp16",
        maxGenerationTokens: 1024,
        temperature: 0,
        api: ollama.Api({
          baseURL: "http://localhost:11434",
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

export async function llamaEventRequest(context: string, maxRetries = 3): Promise<EventSchema> {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const data = await openaiEventRequestMf(context);
      if (!isString(data)) {
        return data;
      }

      throw new Error("ERROR STRING INSTEAD OF OBJECT RETURNED", data);
    } catch (error) {
      console.error(`Error in llamaRequest (attempt ${retries + 1}/${maxRetries}):`, error);
      retries++;

      if (retries >= maxRetries) {
        throw error; // Throw the error after all retry attempts have failed
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * retries)); // Exponential backoff
    }
  }

  throw new Error("Max retries reached");
}
