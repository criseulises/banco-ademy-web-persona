// features/chat/hooks/useAutoScroll.ts

import { useEffect, useRef } from "react";

interface UseAutoScrollReturn {
  messagesEndRef: React.RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
}

/**
 * Hook personalizado para manejar el auto-scroll del chat
 */
export const useAutoScroll = (dependency: unknown): UseAutoScrollReturn => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [dependency]);

  return {
    messagesEndRef: messagesEndRef as React.RefObject<HTMLDivElement>,
    scrollToBottom
  };
};