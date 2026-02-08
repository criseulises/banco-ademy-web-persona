// features/chat/components/ChatMessages.tsx

import React from "react";
import { Message } from "../types";
import { ChatMessage } from "./ChatMessage";

interface ChatMessagesProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  messagesEndRef
}) => {
  if (messages.length === 0) {
    return <div className="flex-1" />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
      <div className="space-y-3">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};