// Simple sentiment analysis function that will be enhanced by DeepSeek model
export function analyzeSentiment(text: string): {
  sentiment: "positive" | "neutral" | "negative";
  score: number;
} {
  // This is a very basic implementation
  // The actual sentiment analysis will be done by the DeepSeek model
  const positiveWords = [
    "happy",
    "good",
    "great",
    "excellent",
    "wonderful",
    "amazing",
    "love",
    "like",
    "enjoy",
    "pleased",
    "delighted",
    "glad",
  ];

  const negativeWords = [
    "sad",
    "bad",
    "terrible",
    "awful",
    "horrible",
    "hate",
    "dislike",
    "disappointed",
    "upset",
    "angry",
    "frustrated",
  ];

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach((word) => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });

  const score = (positiveCount - negativeCount) / words.length;

  if (score > 0.05) return { sentiment: "positive", score };
  if (score < -0.05) return { sentiment: "negative", score };
  return { sentiment: "neutral", score };
}
