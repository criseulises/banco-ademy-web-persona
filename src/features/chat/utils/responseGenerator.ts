// features/chat/utils/responseGenerator.ts

import {
  FINANCIAL_PRODUCTS,
  FINANCIAL_RESPONSE_TEMPLATES,
  SIMULATED_VOICE_TRANSCRIPTIONS
} from "../constants/financialResponses";
import { FinancialProduct } from "../types";

/**
 * Obtiene un elemento aleatorio de un array
 */
const getRandomItem = <T>(array: readonly T[] | T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Genera una transcripción simulada aleatoria
 */
export const generateVoiceTranscription = (): string => {
  return getRandomItem(SIMULATED_VOICE_TRANSCRIPTIONS);
};

/**
 * Selecciona un producto financiero aleatorio
 */
export const getRandomFinancialProduct = (): FinancialProduct => {
  return getRandomItem(FINANCIAL_PRODUCTS);
};

/**
 * Genera una respuesta financiera basada en un producto
 */
export const generateFinancialResponse = (
  product: FinancialProduct = getRandomFinancialProduct()
): string => {
  const template = FINANCIAL_RESPONSE_TEMPLATES[product.type];
  return template(product);
};

/**
 * Genera un ID único para mensajes
 */
export const generateMessageId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Formatea una fecha para timestamp de mensaje
 */
export const formatMessageTimestamp = (date: Date = new Date()): Date => {
  return date;
};