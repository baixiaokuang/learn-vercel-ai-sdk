import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import "./App.css";
import { DefaultChatTransport } from "ai";

function App() {
  // const [messages, setMessages] = useState(["HelloWorld"]);
  const [message, setMessage] = useState("");
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3000/api",
    }),
  });
  return (
    <>
      <div>
        {messages.map((item, i) => (
          <div key={i}>
            {item.role === "user" ? "User: " : "Assistant: "}
            {item.parts.map((part, i) => {
              if (part.type === "text") return <p key={i}>{part.text}</p>;
            })}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: message });
          setMessage("");
        }}
      >
        <input
          placeholder="Input your prompt"
          value={message}
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
        ></input>
      </form>
    </>
  );
}
export default App;
