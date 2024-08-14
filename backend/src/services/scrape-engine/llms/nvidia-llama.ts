import OpenAI from "openai";

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
