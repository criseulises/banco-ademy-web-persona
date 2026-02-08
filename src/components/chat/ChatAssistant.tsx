"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/features/auth/components/AuthContext";
import { useChatMessages } from "@/features/chat/hooks/useChatMessages";
import { useAutoScroll } from "@/features/chat/hooks/useAutoScroll";
import { ChatWelcome } from "@/features/chat/components/ChatWelcome";
import { ChatMessages } from "@/features/chat/components/ChatMessages";
import { ChatInput } from "@/features/chat/components/ChatInput";


/**
 * Componente principal del Chat Assistant
 * Maneja la interfaz de chat con capacidad de mensajes de texto y voz
 */
export const ChatAssistant: React.FC = () => {
  const { user } = useAuth();

  // Hooks personalizados
  const {
    messages,
    inputValue,
    voiceRecording,
    setInputValue,
    handleSendMessage,
    handleVoiceInput,
    handleKeyPress
  } = useChatMessages();

  const { messagesEndRef } = useAutoScroll(messages);

  // Obtener el primer nombre del usuario
  const userName = user?.name?.split(" ")[0] || "Cristian";

  // Determinar si mostrar la imagen (solo cuando no hay mensajes)
  const showImage = messages.length === 0;

  return (
    <div className="h-full flex flex-col p-6">
      {/* Outer Gradient Border */}
      <div
        className="flex-1 rounded-[40px] p-1"
        style={{
          background: "linear-gradient(180deg, #0099FF 0%, #FF6600 100%)"
        }}
      >
        {/* Inner White Background */}
        <div className="bg-white rounded-[36px] h-full flex flex-col relative overflow-hidden">
          {/* Imagen Centrada - SOLO cuando no hay mensajes */}
          {showImage && (
            <div className="absolute top-70 left-0 right-0 flex justify-center">
              <div className="w-36 h-34 transform -translate-y-1/2">
                <Image
                  src="/icon/use-app/chat-smile.svg"
                  alt="Chat Assistant"
                  width={144}
                  height={136}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* Messages Area */}
          <ChatMessages
            messages={messages}
            messagesEndRef={messagesEndRef}
          />

          {/* Welcome Section */}
          <ChatWelcome
            userName={userName}
            hasMessages={messages.length > 0}
          />

          {/* Input Area */}
          <ChatInput
            inputValue={inputValue}
            voiceRecording={voiceRecording}
            onInputChange={setInputValue}
            onKeyPress={handleKeyPress}
            onSendMessage={handleSendMessage}
            onVoiceInput={handleVoiceInput}
          />
        </div>
      </div>
    </div>
  );
};