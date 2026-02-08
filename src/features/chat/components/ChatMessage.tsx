// features/chat/components/ChatMessage.tsx

import React from "react";
import { Message } from "../types";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";
  const isVoiceMessage = message.type === "voice";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-[#0095A9] text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {isVoiceMessage && isUser && (
          <span className="inline-block text-xs opacity-70 mb-1">
            Mensaje de voz
          </span>
        )}
        <p className="text-sm font-[family-name:var(--font-montserrat)] whitespace-pre-wrap">
          {message.text}
        </p>
      </div>
    </div>
  );
};