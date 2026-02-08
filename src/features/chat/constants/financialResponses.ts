// features/chat/constants/financialResponses.ts

import { FinancialProduct } from "../types";

export const VOICE_RECORDING_DURATION = 3000; // 3 segundos

export const SIMULATED_VOICE_TRANSCRIPTIONS = [
  "¿Cuál es el estado de mi préstamo?",
  "¿Cuánto debo este mes?",
  "¿Cuándo vence mi próximo pago?",
  "¿Qué servicios tengo pendientes?",
  "Muéstrame mis productos financieros",
  "¿Cuál es mi saldo disponible?",
] as const;

export const FINANCIAL_PRODUCTS: FinancialProduct[] = [
  {
    type: "loan",
    name: "Préstamo Personal",
    amount: 5000.00,
    status: "activo",
    dueDate: "15/03/2026"
  },
  {
    type: "loan",
    name: "Préstamo Vehicular",
    amount: 12000.00,
    status: "activo",
    dueDate: "20/02/2026"
  },
  {
    type: "debt",
    name: "Tarjeta de Crédito Visa",
    amount: 1250.50,
    status: "pendiente",
    dueDate: "28/02/2026"
  },
  {
    type: "debt",
    name: "Tarjeta de Crédito Mastercard",
    amount: 890.00,
    status: "pendiente",
    dueDate: "05/03/2026"
  },
  {
    type: "service",
    name: "Seguro de Vida",
    amount: 45.00,
    status: "pendiente",
    dueDate: "10/03/2026"
  },
  {
    type: "service",
    name: "Plan de Ahorro Programado",
    amount: 200.00,
    status: "activo",
    dueDate: "01/03/2026"
  },
  {
    type: "savings",
    name: "Cuenta de Ahorros",
    amount: 3500.75,
    status: "activo"
  },
  {
    type: "investment",
    name: "Certificado Financiero",
    amount: 10000.00,
    status: "activo",
    dueDate: "30/06/2026"
  }
];

export const FINANCIAL_RESPONSE_TEMPLATES = {
  loan: (product: FinancialProduct) =>
    `Tu ${product.name} tiene un saldo pendiente de **RD$${product.amount.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}**. El próximo pago vence el ${product.dueDate}.`,
  
  debt: (product: FinancialProduct) =>
    `Tienes un monto pendiente de **RD$${product.amount.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}** en tu ${product.name}. La fecha límite de pago es ${product.dueDate}.`,
  
  service: (product: FinancialProduct) =>
    `Tu servicio de ${product.name} tiene un pago pendiente de **RD$${product.amount.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}** con vencimiento el ${product.dueDate}.`,
  
  savings: (product: FinancialProduct) =>
    `Tu ${product.name} tiene un saldo disponible de **RD$${product.amount.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}**.`,
  
  investment: (product: FinancialProduct) =>
    `Tu ${product.name} por **RD$${product.amount.toLocaleString("es-DO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}** vence el ${product.dueDate}.`
} as const;