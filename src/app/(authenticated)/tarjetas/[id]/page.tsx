'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { colors } from '@/styles/colors';
import { formatRelativeDate } from '@/utils/dateUtils';

type FilterType = 'todo' | 'credito' | 'debito';

interface Card {
  id: string;
  userId: string;
  accountId: string;
  cardNumber: string;
  cardType: string;
  brand: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
  status: string;
  issuedDate: string;
  creditLimit: number | null;
  availableCredit: number | null;
  usedCredit: number | null;
  minimumPayment?: number;
  totalDue?: number;
  dueDate?: string;
  nickname: string;
  isDefault: boolean;
  contactless: boolean;
  dailyLimit: number;
  monthlyLimit: number | null;
  internationalEnabled: boolean;
  onlineEnabled: boolean;
  rewardPoints?: number;
}

interface Transaction {
  id: string;
  accountId: string;
  cardId?: string;
  type: string;
  amount: number;
  description: string;
  reference: string;
  date: string;
  status: string;
}

export default function CardDetailsPage() {
  const params = useParams();
  const cardId = params.id as string;

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('todo');
  const [card, setCard] = useState<Card | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCardNumber, setShowCardNumber] = useState(false);

  useEffect(() => {
    // Cargar datos de la tarjeta
    Promise.all([
      fetch('/mock_data/cards.json').then(res => res.json()),
      fetch('/mock_data/transactions.json').then(res => res.json()),
    ])
      .then(([cardsData, transactionsData]) => {
        // Buscar la tarjeta por número de tarjeta
        const foundCard = cardsData.cards.find(
          (c: Card) => c.cardNumber === cardId
        );
        setCard(foundCard || null);

        // Filtrar transacciones de esta tarjeta
        const cardTransactions = transactionsData.transactions.filter(
          (tx: any) => tx.cardId === foundCard?.id || tx.accountId === foundCard?.accountId
        );
        setTransactions(cardTransactions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading card data:', error);
        setLoading(false);
      });
  }, [cardId]);

  const filteredTransactions = transactions.filter(t => {
    if (selectedFilter === 'todo') return true;
    if (selectedFilter === 'credito') return t.type === 'DEPOSITO' || t.type === 'TRANSFERENCIA_RECIBIDA' || t.type === 'PAGO_TARJETA';
    if (selectedFilter === 'debito') return t.type === 'RETIRO_ATM' || t.type === 'TRANSFERENCIA_ENVIADA' || t.type === 'PAGO_PRESTAMO' || t.type === 'PAGO_SERVICIO' || t.type === 'COMPRA_COMERCIO';
    return true;
  });

  const getTransactionDisplayType = (type: string): 'credito' | 'debito' => {
    const creditTypes = ['DEPOSITO', 'TRANSFERENCIA_RECIBIDA', 'PAGO_TARJETA'];
    return creditTypes.includes(type) ? 'credito' : 'debito';
  };

  const maskCardNumber = (cardNumber: string) => {
    if (showCardNumber) {
      return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    const first4 = cardNumber.slice(0, 4);
    const last4 = cardNumber.slice(-4);
    return `${first4}********${last4}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando detalles de tarjeta...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Tarjeta no encontrada
          </h2>
          <p style={{ color: colors.textSecondary }}>
            No se pudo encontrar la tarjeta solicitada
          </p>
        </div>
      </div>
    );
  }

  const actionButtons = [
    { label: 'Pagar tarjeta', icon: '/icon/tabler/tabler-icon-wallet.svg' },
    { label: 'Estado de cuenta', icon: '/icon/tabler/tabler-icon-file-document.svg' },
    { label: 'Congelar tarjeta', icon: '/icon/tabler/tabler-icon-snowflake.svg' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Detalles de tarjeta
          </h1>
        </div>

        {/* Card, Balance and Buttons Section */}
        <div className="mb-8">
          <div className="flex gap-8">
            {/* Card - Left Side */}
            <div className="bg-white rounded-2xl p-6 w-[420px]">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                    {card.nickname}
                  </h2>
                  <Image
                    src="/icon/tabler/tabler-icon-edit.svg"
                    alt="Editar"
                    width={16}
                    height={16}
                    className="opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                    }}
                  />
                </div>
                <button onClick={() => setShowCardNumber(!showCardNumber)} className="opacity-60 hover:opacity-100 transition-opacity">
                  <Image
                    src="/icon/tabler/tabler-icon-eye.svg"
                    alt="Mostrar/Ocultar"
                    width={20}
                    height={20}
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                    }}
                  />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-bold tracking-wider mb-2" style={{ color: colors.textPrimary }}>
                  {maskCardNumber(card.cardNumber)}
                </p>
                <p className="text-xs font-semibold uppercase" style={{ color: colors.grey600 }}>
                  {card.holderName}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-6 items-center">
                  <p className="text-sm" style={{ color: colors.textPrimary }}>
                    {showCardNumber ? card.expiryDate : '**/**'}
                  </p>
                  <p className="text-sm" style={{ color: colors.textPrimary }}>
                    CVV {showCardNumber ? card.cvv : '***'}
                  </p>
                </div>
                <Image
                  src="/icon/custom/visa.png"
                  alt="VISA"
                  width={60}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Side - Balance and Buttons */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Top Row - Disponible and Balance */}
              <div className="flex gap-12">
                <div>
                  <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                    Disponible
                  </p>
                  <p className="text-5xl font-bold" style={{ color: '#5FBFC4' }}>
                    RD$ {(card.cardType === 'CREDITO' ? (card.availableCredit || 0) : 0).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div>
                  <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                    Balance
                  </p>
                  <p className="text-5xl font-bold" style={{ color: '#F47B56' }}>
                    RD$ {(card.cardType === 'CREDITO' ? (card.usedCredit || 0) : 0).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Bottom Row - Action Buttons */}
              <div className="flex gap-4">
                {actionButtons.map((button, index) => (
                  <button
                    key={index}
                    className="bg-white rounded-2xl p-5 flex flex-col items-center justify-center gap-3 flex-1 cursor-pointer transition-all hover:shadow-lg"
                  >
                    <Image
                      src={button.icon}
                      alt={button.label}
                      width={32}
                      height={32}
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(59%) sepia(45%) saturate(388%) hue-rotate(137deg) brightness(91%) contrast(87%)',
                      }}
                    />
                    <span className="text-sm font-semibold text-center" style={{ color: colors.textPrimary }}>
                      {button.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Movements Section - Full Width */}
        <div className="bg-white rounded-2xl p-8">
          <h3 className="text-3xl font-bold mb-6" style={{ color: colors.textPrimary }}>
            Movimientos
          </h3>

          {/* Filter Tabs */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setSelectedFilter('todo')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedFilter === 'todo' ? 'font-semibold' : ''
              }`}
              style={{
                borderColor: selectedFilter === 'todo' ? '#FA6C26' : colors.grey300,
                backgroundColor: selectedFilter === 'todo' ? '#FA6C2610' : 'white',
                color: selectedFilter === 'todo' ? '#FA6C26' : colors.grey600,
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/tabler/tabler-icon-arrows-exchange-2.svg"
                  alt="Todo"
                  width={16}
                  height={16}
                  style={{
                    filter: selectedFilter === 'todo'
                      ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3583%) hue-rotate(352deg) brightness(100%) contrast(97%)'
                      : 'brightness(0) saturate(0%) brightness(60%)',
                  }}
                />
                <span>Todo</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('credito')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedFilter === 'credito' ? 'font-semibold' : ''
              }`}
              style={{
                borderColor: selectedFilter === 'credito' ? '#FA6C26' : colors.grey300,
                backgroundColor: selectedFilter === 'credito' ? '#FA6C2610' : 'white',
                color: selectedFilter === 'credito' ? '#FA6C26' : colors.grey600,
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/tabler/tabler-icon-arrow-bar-up.svg"
                  alt="Crédito"
                  width={16}
                  height={16}
                  style={{
                    filter: selectedFilter === 'credito'
                      ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3583%) hue-rotate(352deg) brightness(100%) contrast(97%)'
                      : 'brightness(0) saturate(0%) brightness(60%)',
                  }}
                />
                <span>Crédito</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('debito')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedFilter === 'debito' ? 'font-semibold' : ''
              }`}
              style={{
                borderColor: selectedFilter === 'debito' ? '#FA6C26' : colors.grey300,
                backgroundColor: selectedFilter === 'debito' ? '#FA6C2610' : 'white',
                color: selectedFilter === 'debito' ? '#FA6C26' : colors.grey600,
              }}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                <span>Débito</span>
              </div>
            </button>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-base" style={{ color: colors.grey500 }}>
                  No hay transacciones para mostrar
                </p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => {
                const displayType = getTransactionDisplayType(transaction.type);
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: displayType === 'credito' ? '#5FBFC420' : '#F47B5620',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={displayType === 'credito' ? '#5FBFC4' : '#F47B56'}
                          strokeWidth="2.5"
                        >
                          {displayType === 'credito' ? (
                            <path d="M12 19V5M5 12l7-7 7 7" />
                          ) : (
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                          )}
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-base mb-1" style={{ color: colors.textPrimary }}>
                          {transaction.description}
                        </p>
                        <p className="text-xs font-mono" style={{ color: colors.grey500 }}>
                          {transaction.reference}
                        </p>
                      </div>
                    </div>

                    <div className="text-right ml-4">
                      <p
                        className="text-xl font-bold mb-1"
                        style={{
                          color: displayType === 'credito' ? '#5FBFC4' : '#F47B56',
                        }}
                      >
                        RD$ {transaction.amount.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs" style={{ color: colors.grey500 }}>
                        {formatRelativeDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
