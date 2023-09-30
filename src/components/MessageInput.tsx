import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface MessageInputProps {
  sendMessage: (message: string) => void;
}

export const MessageInput = ({ sendMessage }: MessageInputProps) => {
  const [input, setInput] = useState("");

  return (
    <>
      <TextField value={input} onChange={(e) => setInput(e.target.value)} />
      <Button
        onClick={() => {
          sendMessage(input);
        }}
      >
        Send Message
      </Button>
    </>
  );
};
