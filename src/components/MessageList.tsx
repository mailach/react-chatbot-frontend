import { Box } from "@mui/material";
import { ChatMessage } from "../Message";
import { MessageItem } from "./MessageItem";

export const MessageList = ({ messages }: { messages: ChatMessage[] }) => {
  return (
    <Box>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </Box>
  );
};
