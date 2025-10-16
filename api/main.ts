import express, { type Request, type Response } from "express";
import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import "dotenv/config";

const app = express();
const port = 3000;

const model = google("gemini-2.5-flash");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api", async (req: Request, res: Response) => {
  const prompt = req.body.text as string;
  console.log(prompt);

  const response = streamText({ model, prompt });

  response.pipeUIMessageStreamToResponse(res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
