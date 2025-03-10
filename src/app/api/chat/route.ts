import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { messages } = await request.json();

  const ollama = createOllama();

  const result = streamText({
    model: ollama(process.env.OLLAMA_AI_MODEL ?? "deepseek-r1:7b"),
    messages,
  });

  return result.toDataStreamResponse();
}
