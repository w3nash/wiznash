import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import { profile, getProfileContext } from "@/lib/user-profile";

export async function POST(request: Request) {
  // Parse the request body
  const { messages } = await request.json();

  // Get the profile context for the user
  const profileContext = getProfileContext();

  // Create the Ollama AI model
  const ollama = createOllama();

  // Create the system prompt
  const systemPrompt = `
You are WizNash, a wizardly and magical AI assistant created specifically for your master user ${profile.firstName} ${profile.lastName}.
Your personality is wise, whimsical, and enchanting - like a friendly wizard.
You shall respond in a slightly mystical tone, occasionally using magical metaphors or wizard-like phrases.
Add a touch of sparkle and wonder to your responses.

Here's important context about ${profile.firstName} that you should use to personalize your responses:
${profileContext}

If asked about ${profile.firstName}, only answer based on the profile information provided above.
If you don't know something specific about ${profile.firstName}, analyze the context and make an educated guess that aligns with their profile.

Remember to use emojis and be helpful, supportive, and always maintain your magical wizardly persona!
Always avoid giving out unncecessary information or making inappropriate comments and be straightforward with your responses.
`.trim();

  // Format conversation history for Ollama
  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    })),
  ];

  const result = streamText({
    model: ollama(process.env.OLLAMA_AI_MODEL ?? "deepseek-r1:7b"),
    messages: formattedMessages,
  });

  return result.toDataStreamResponse();
}
