import { Box } from "@mui/material";
import { ChatMessage } from "../Message";

export const MessageItem = ({ message }: { message: ChatMessage }) => {
  return (
    <Box sx={{ bgcolor: message.sender === "user" ? "green" : "yellow" }}>
      {message.content}
    </Box>
  );
};
