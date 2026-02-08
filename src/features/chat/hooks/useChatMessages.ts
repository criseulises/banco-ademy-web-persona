// features/chat/hooks/useChatMessages.ts

import { useState, useCallback, useRef, useEffect } from "react";
import { Message, VoiceRecordingState } from "../types";
import {
  generateMessageId,
  generateVoiceTranscription,
  generateFinancialResponse,
  formatMessageTimestamp
} from "../utils/responseGenerator";
import { VOICE_RECORDING_DURATION } from "../constants/financialResponses";

interface UseChatMessagesReturn {
  messages: Message[];
  inputValue: string;
  voiceRecording: VoiceRecordingState;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleVoiceInput: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export const useChatMessages = (): UseChatMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  
  // Fixed: Initialize with proper union type
  const [voiceRecording, setVoiceRecording] = useState<VoiceRecordingState>({
    isRecording: false,
    progress: 0
  });

  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Limpia los timers de grabación
   */
  const clearRecordingTimers = useCallback(() => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  /**
   * Agrega un nuevo mensaje al chat
   */
  const addMessage = useCallback((
    text: string,
    sender: Message["sender"],
    type: Message["type"] = "text"
  ): void => {
    const newMessage: Message = {
      id: generateMessageId(),
      text,
      sender,
      type,
      timestamp: formatMessageTimestamp()
    };

    setMessages((prev) => [...prev, newMessage]);
  }, []);

  /**
   * Simula la respuesta del asistente con un delay
   */
  const simulateAssistantResponse = useCallback((
    responseText: string,
    delay: number = 1500
  ): void => {
    setTimeout(() => {
      addMessage(responseText, "assistant", "text");
    }, delay);
  }, [addMessage]);

  /**
   * Procesa el envío de un mensaje de texto
   */
  const handleSendMessage = useCallback(() => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    addMessage(trimmedInput, "user", "text");
    setInputValue("");

    // Simular respuesta del asistente
    simulateAssistantResponse(
      "¡Gracias por tu mensaje! Estoy aquí para ayudarte."
    );
  }, [inputValue, addMessage, simulateAssistantResponse]);

  /**
   * Simula el proceso de grabación de voz
   */
  const handleVoiceInput = useCallback(() => {
    if (voiceRecording.isRecording) return;

    // Iniciar grabación
    setVoiceRecording({ isRecording: true, progress: 0 });

    // Actualizar progreso cada 100ms
    const progressStep = 100 / (VOICE_RECORDING_DURATION / 100);
    let currentProgress = 0;

    progressIntervalRef.current = setInterval(() => {
      currentProgress += progressStep;
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
      setVoiceRecording({ isRecording: true, progress: currentProgress });
    }, 100);

    // Finalizar grabación después de 3 segundos
    recordingTimerRef.current = setTimeout(() => {
      clearRecordingTimers();
      setVoiceRecording({ isRecording: false, progress: 0 });

      // 1. Generar transcripción simulada
      const transcription = generateVoiceTranscription();
      
      // 2. Agregar mensaje del usuario (transcripción)
      addMessage(transcription, "user", "voice");

      // 3. Simular procesamiento y responder con dato financiero
      setTimeout(() => {
        addMessage("Procesando tu solicitud...", "assistant", "text");
        
        // 4. Después de 800ms, dar la respuesta financiera
        setTimeout(() => {
          const financialResponse = generateFinancialResponse();
          addMessage(financialResponse, "assistant", "text");
        }, 800);
      }, 600);

    }, VOICE_RECORDING_DURATION);
  }, [voiceRecording, addMessage, clearRecordingTimers]);

  /**
   * Maneja la tecla Enter para enviar mensajes
   */
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  /**
   * Limpieza al desmontar el componente
   */
  useEffect(() => {
    return () => {
      clearRecordingTimers();
    };
  }, [clearRecordingTimers]);

  return {
    messages,
    inputValue,
    voiceRecording,
    setInputValue,
    handleSendMessage,
    handleVoiceInput,
    handleKeyPress
  };
};