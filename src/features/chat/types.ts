// features/chat/types.ts

export type MessageSender = "user" | "assistant";

export type MessageType = "text" | "voice";

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  type: MessageType;
  timestamp: Date;
}

// Fixed: Use proper union type syntax
export type VoiceRecordingState = {
  isRecording: false;
  progress: 0;
} | {
  isRecording: true;
  progress: number;
};

export interface FinancialProduct {
  type: "loan" | "debt" | "service" | "savings" | "investment";
  name: string;
  amount: number;
  status?: string;
  dueDate?: string;
}