import "dotenv/config";
import { generateText, streamText } from "ai";
import { google } from "@ai-sdk/google";

const model = google("gemini-2.5-flash");
const prompt =
  "Give me the first paragraph of a story about an imaginary planet.";
const result = streamText({ model, prompt });
for await (const chunk of result.textStream) {
  console.log(chunk);
}
