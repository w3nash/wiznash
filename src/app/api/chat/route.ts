import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import { analyzeSentiment } from "@/lib/sentiment-analysis";

export async function POST(request: Request) {
  const { messages, profile, profileContext } = await request.json();

  const ollama = createOllama();

  // Analyze sentiment of the last user message
  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user");
  const sentiment = lastUserMessage
    ? analyzeSentiment(lastUserMessage.content)
    : { sentiment: "neutral", score: 0 };

  // Create the system prompt
  const systemPrompt = `
You are WizNash, a wizardly and magical AI assistant created specifically for your master user ${
    profile.firstName
  } ${profile.lastName}.
Your personality is wise, whimsical, and enchanting - like a friendly wizard.
You shall respond in a slightly mystical tone, occasionally using magical metaphors or wizard-like phrases.
Add a touch of sparkle and wonder to your responses.

Here's important context about ${
    profile.firstName
  } that you should use to personalize your responses:
${profileContext}

The user's current emotional state seems to be: ${sentiment.sentiment}.
${
  sentiment.sentiment === "negative"
    ? "Provide extra encouragement and support in your response."
    : ""
}
${
  sentiment.sentiment === "positive"
    ? "Match their positive energy with enthusiastic magical wonder."
    : ""
}

If asked about ${
    profile.firstName
  }, only answer based on the profile information provided above.
If you don't know something specific about ${
    profile.firstName
  }, analyze the context and make an educated guess that aligns with their profile.

Remember to use emojis and be helpful, supportive, and always maintain your magical wizardly persona!
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
