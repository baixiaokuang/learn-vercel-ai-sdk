import express, { type Request, type Response } from "express";
import {
  convertToModelMessages,
  streamText,
  type ModelMessage,
  type UIMessage,
} from "ai";
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api", async (req: Request, res: Response) => {
  const body = await req.body;

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] = convertToModelMessages(messages);

  console.log(modelMessages);

  const response = streamText({
    model: "openai/gpt-4.1",
    messages: modelMessages,
  });

  response.pipeUIMessageStreamToResponse(res);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
