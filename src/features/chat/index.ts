// features/chat/index.ts

// Types
export type {
  Message,
  MessageSender,
  MessageType,
  VoiceRecordingState,
  FinancialProduct
} from "./types";


// Utils
export {
  generateVoiceTranscription,
  getRandomFinancialProduct,
  generateFinancialResponse,
  generateMessageId,
  formatMessageTimestamp
} from "./utils/responseGenerator";

// Constants
export {
  VOICE_RECORDING_DURATION,
  SIMULATED_VOICE_TRANSCRIPTIONS,
  FINANCIAL_PRODUCTS,
  FINANCIAL_RESPONSE_TEMPLATES
} from "./constants/financialResponses";