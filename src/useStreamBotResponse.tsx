import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useState } from "react";
import { ChatMessage } from "./Message";

export const useStreamBotResponse = () => {
  const [message, setMessage] = useState<ChatMessage | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiResponse = async (prompt: string) => {
    setIsLoading(true);
    const ctrl = new AbortController();

    await fetchEventSource("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0,
        stream: true,
      }),
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer KEY",
      },
      onmessage: (ev) => {
        console.log(ev);
        const response = JSON.parse(ev.data);
        const choice = response.choices[0];
        if (choice.finish_reason === "stop") {
          console.log("stopped");
          setIsLoading(false);
          ctrl.abort();
        }
        const text = choice.delta.content;
        console.log(text);
        if (typeof text === "string") {
          setMessage((message) => ({
            content: `${message?.content ?? ""}${text}`,
            id: "newest",
            sender: "bot",
          }));
        }
      },
    });
  };
  return { message, setMessage, isLoading, fetchApiResponse };
};
