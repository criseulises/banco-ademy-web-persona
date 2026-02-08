// features/chat/components/ChatWelcome.tsx

import React from "react";

interface ChatWelcomeProps {
  userName: string;
  hasMessages: boolean;
}

export const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  userName,
  hasMessages
}) => {
  if (hasMessages) {
    return null;
  }

  return (
    <div className="flex-shrink-0 px-3 pb-4">
      <div className="flex flex-col items-center justify-center">
        <div className="mt-20 space-y-3">
          <p className="text-xs font-medium font-[family-name:var(--font-montserrat)] leading-relaxed">
            ¡Hola,{" "}
            <span className="text-[#0095A9] font-semibold">
              {userName}
            </span>
            ! Soy tu asistente inteligente
          </p>
          <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)] text-gray-900 leading-tight">
            ¿En qué te puedo
            <br />
            ayudar?
          </h2>
        </div>
      </div>
    </div>
  );
};