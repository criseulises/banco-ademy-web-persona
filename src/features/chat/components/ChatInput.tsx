// features/chat/components/ChatInput.tsx

import React from "react";
import Image from "next/image";
import { Mic, Send } from "lucide-react";
import { VoiceRecordingState } from "../types";

interface ChatInputProps {
  inputValue: string;
  voiceRecording: VoiceRecordingState;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSendMessage: () => void;
  onVoiceInput: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  voiceRecording,
  onInputChange,
  onKeyPress,
  onSendMessage,
  onVoiceInput
}) => {
  const hasText = inputValue.trim().length > 0;
  const isRecording = voiceRecording.isRecording;

  return (
    <div className="flex-shrink-0 px-3 pb-8 pt-4 w-full">
      <div
        className="rounded-[12px] p-[2.5px] relative w-full"
        style={{
          background: "linear-gradient(135deg, #0099FF 0%, #FF6600 100%)"
        }}
      >
        {/* Barra de progreso de grabación */}
        {isRecording && (
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-[12px] transition-all duration-100 ease-linear"
            style={{
              width: `${voiceRecording.progress}%`
            }}
          />
        )}

        <div className="bg-white rounded-[10.5px] flex items-center px-5 py-3 pr-16 w-full relative z-10">
          {/* Stars Icon */}
          <div className="shrink-0 mr-5">
            <Image
              src="/icon/use-app/stars.svg"
              alt="Stars"
              width={27}
              height={27}
            />
          </div>

          {/* Input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={
              isRecording 
                ? "Grabando..." 
                : "Pregunta algo"
            }
            disabled={isRecording}
            className="flex-1 bg-transparent border-none outline-none text-sm font-[family-name:var(--font-montserrat)] placeholder:text-gray-400 text-gray-900 w-full disabled:opacity-50"
          />
        </div>

        {/* Voice/Send Button */}
        <button
          onClick={hasText ? onSendMessage : onVoiceInput}
          disabled={isRecording}
          className={`absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all z-20 ${
            isRecording
              ? "bg-red-500 animate-pulse cursor-not-allowed"
              : hasText
              ? "bg-[#0095A9] hover:bg-[#007d8f] active:scale-95"
              : "bg-[#0095A9] hover:bg-[#007d8f] active:scale-95"
          }`}
          aria-label={
            isRecording
              ? "Grabando..."
              : hasText
              ? "Enviar mensaje"
              : "Grabar voz"
          }
        >
          {hasText ? (
            <Send size={16} className="text-white" />
          ) : (
            <Mic size={16} className="text-white" />
          )}
        </button>

        {/* Indicador de tiempo de grabación */}
        {isRecording && (
          <div className="absolute -top-8 right-0 text-xs text-red-500 font-semibold font-[family-name:var(--font-montserrat)] animate-pulse">
            Grabando {Math.ceil((3 - (voiceRecording.progress / 100) * 3))}s
          </div>
        )}
      </div>
    </div>
  );
};