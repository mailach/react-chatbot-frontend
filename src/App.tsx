import { useEffect, useState } from "react";
import "./App.css";
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";
import { ChatMessage } from "./Message";
import { useStreamBotResponse } from "./useStreamBotResponse";
import { Bootstrap } from "./Bootstrap";
import { Grid } from "@mui/material";

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { message, setMessage, isLoading, fetchApiResponse } =
    useStreamBotResponse();
  const messagesToDisplay = message ? [...messages, message] : messages;

  useEffect(() => {
    if (!isLoading && message) {
      setMessages([...messages, message]);
      setMessage(undefined);
    }
  }, [isLoading]);

  console.log("messages: ", messages, "message: ", message);

  return (
    <Bootstrap>
      <Grid container width="100%">
        <Grid item xs={3}>
          Linke Spalte
        </Grid>
        <Grid item xs={9} container direction="column" width="100%">
          <MessageList messages={messagesToDisplay} />
          <MessageInput
            sendMessage={async (prompt) => {
              setMessages([...messages, { content: prompt, sender: "user" }]);
              await fetchApiResponse(prompt);
            }}
          />
        </Grid>
      </Grid>
    </Bootstrap>
  );
}

export default App;
