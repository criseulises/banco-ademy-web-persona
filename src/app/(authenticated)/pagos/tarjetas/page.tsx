'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';
import { useRouter } from 'next/navigation';

interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  balance: number;
  availableBalance: number;
  nickname: string;
  status: string;
}

interface Card {
  id: string;
  userId: string;
  accountId: string;
  cardNumber: string;
  cardType: 'DEBITO' | 'CREDITO';
  brand: string;
  holderName: string;
  nickname: string;
  status: string;
  creditLimit?: number;
  availableCredit?: number;
  usedCredit?: number;
  minimumPayment?: number;
  totalDue?: number;
  dueDate?: string;
}

type Step = 'form' | 'confirm' | 'success';

function formatCurrency(amount: number) {
  return `RD$ ${amount.toLocaleString('es-DO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatInputAmount(raw: string): string {
  if (!raw) return '';
  const [intPart, decPart] = raw.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
}

function AccountSelect({
  label,
  value,
  onChange,
  accounts,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  accounts: Account[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = accounts.find((a) => a.id === value);

  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
        {label}
      </label>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-all text-left bg-white"
          style={{ borderColor: error ? colors.error : colors.border }}
        >
          <span style={{ color: selected ? colors.textPrimary : colors.textHint }}>
            {selected
              ? `${selected.nickname} - ${selected.accountNumber.slice(-4)}`
              : placeholder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: colors.primary, flexShrink: 0 }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && accounts.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border"
            style={{ borderColor: colors.border }}
          >
            {accounts.map((account) => (
              <button
                key={account.id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  onChange(account.id);
                  setOpen(false);
                }}
              >
                <div className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                  {account.nickname}
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  **** {account.accountNumber.slice(-4)} · {formatCurrency(account.availableBalance)}
                </div>
              </button>
            ))}
          </div>
        )}
        {error && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function CardSelect({
  label,
  value,
  onChange,
  cards,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  cards: Card[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = cards.find((c) => c.id === value);

  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
        {label}
      </label>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-all text-left bg-white"
          style={{ borderColor: error ? colors.error : colors.border }}
        >
          <span style={{ color: selected ? colors.textPrimary : colors.textHint }}>
            {selected ? `${selected.nickname} - ${selected.cardNumber.slice(-4)}` : placeholder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: colors.primary, flexShrink: 0 }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && cards.length > 0 && (
          <div
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto"
            style={{ borderColor: colors.border }}
          >
            {cards.map((card) => (
              <button
                key={card.id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => {
                  onChange(card.id);
                  setOpen(false);
                }}
              >
                <div className="font-semibold text-sm" style={{ color: colors.textPrimary }}>
                  {card.nickname}
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  **** {card.cardNumber.slice(-4)} · {card.brand}
                  {card.cardType === 'CREDITO' && card.totalDue !== undefined && (
                    <span> · {formatCurrency(card.totalDue)}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
        {error && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PagosTarjetas() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>('form');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [concepto, setConcepto] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch('/mock_data/accounts.json').then((r) => r.json()),
      fetch('/mock_data/cards.json').then((r) => r.json()),
    ])
      .then(([accountsData, cardsData]) => {
        setAccounts(
          accountsData.accounts.filter(
            (acc: Account) => acc.userId === 'user_001' && acc.status === 'ACTIVE'
          )
        );
        // Solo mostrar tarjetas de crédito activas del usuario
        setCards(
          cardsData.cards.filter(
            (card: Card) =>
              card.userId === 'user_001' &&
              card.status === 'ACTIVE' &&
              card.cardType === 'CREDITO'
          )
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const parsedAmount = parseFloat(monto) || 0;
  const origenAccount = accounts.find((a) => a.id === origen);
  const destinoCard = cards.find((c) => c.id === destino);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!origen) newErrors.origen = 'Selecciona una cuenta origen';
    if (!destino) newErrors.destino = 'Selecciona una tarjeta a pagar';
    if (!monto || parsedAmount <= 0) newErrors.monto = 'Ingresa un monto válido';
    if (parsedAmount > 0 && origenAccount && parsedAmount > origenAccount.availableBalance)
      newErrors.monto = 'Fondos insuficientes';
    if (
      parsedAmount > 0 &&
      destinoCard &&
      destinoCard.totalDue !== undefined &&
      parsedAmount > destinoCard.totalDue
    )
      newErrors.monto = 'El monto supera la deuda total de la tarjeta';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) setStep('confirm');
  };

  const handleProceder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const now = new Date();
      setTransactionDate(
        now.toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' })
      );
      setTransactionRef(`2025${Date.now().toString().slice(-8)}`);
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const handleReset = () => {
    setStep('form');
    setOrigen('');
    setDestino('');
    setMonto('');
    setConcepto('');
    setErrors({});
    router.push('/dashboard');
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary }}
          />
          <p style={{ color: colors.textSecondary }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Pago de producto
          </h1>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountSelect
              label="Origen"
              value={origen}
              onChange={(id) => {
                setOrigen(id);
                setErrors((prev) => ({ ...prev, origen: '' }));
              }}
              accounts={accounts}
              placeholder="Selecciona un producto origen"
              error={errors.origen}
            />

            <CardSelect
              label="Destino"
              value={destino}
              onChange={(id) => {
                setDestino(id);
                setErrors((prev) => ({ ...prev, destino: '' }));
              }}
              cards={cards}
              placeholder="Selecciona un producto a pagar"
              error={errors.destino}
            />

            {/* Monto */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: colors.textPrimary }}
              >
                Monto
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: colors.primary }}
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Digite el monto a pagar"
                  value={formatInputAmount(monto)}
                  onChange={(e) => {
                    setMonto(e.target.value.replace(/[^0-9.]/g, ''));
                    setErrors((prev) => ({ ...prev, monto: '' }));
                  }}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all"
                  style={{ borderColor: errors.monto ? colors.error : colors.border }}
                />
              </div>
              {errors.monto && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {errors.monto}
                </p>
              )}
            </div>

            {/* Concepto */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: colors.textPrimary }}
              >
                Concepto
              </label>
              <input
                type="text"
                placeholder="Escribe un comentario"
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all"
                style={{ borderColor: colors.border }}
              />
            </div>
          </div>

          {/* Info de tarjeta seleccionada */}
          {destinoCard && destinoCard.totalDue !== undefined && (
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: colors.grey100 }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    Deuda total
                  </p>
                  <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                    {formatCurrency(destinoCard.totalDue)}
                  </p>
                </div>
                {destinoCard.minimumPayment !== undefined && (
                  <div>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      Pago mínimo
                    </p>
                    <p className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                      {formatCurrency(destinoCard.minimumPayment)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.secondary, color: 'white' }}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Dialog */}
      {step === 'confirm' && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setStep('form')}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                Confirmar pago
              </h2>
              <button
                onClick={() => setStep('form')}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: colors.textPrimary }}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Origen</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {origenAccount?.nickname} - {origenAccount?.accountNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Tarjeta a pagar</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {destinoCard?.nickname} - {destinoCard?.cardNumber.slice(-4)}
                </span>
              </div>
              {concepto && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Concepto</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {concepto}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-dashed" style={{ borderColor: colors.border }} />

            <div className="py-4">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Total a pagar</span>
                <span className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                  {formatCurrency(parsedAmount)}
                </span>
              </div>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="flex-1 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: colors.border, color: colors.textSecondary }}
              >
                Regresar
              </button>
              <button
                type="button"
                onClick={handleProceder}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-lg font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: isProcessing ? colors.grey400 : colors.primary,
                  color: 'white',
                }}
              >
                {isProcessing ? (
                  <>
                    <div
                      className="animate-spin rounded-full h-5 w-5 border-b-2"
                      style={{ borderColor: 'white' }}
                    />
                    Procesando...
                  </>
                ) : (
                  'Proceder'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {step === 'success' && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#D1FAE5' }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{ color: colors.success }}
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
              ¡Pago exitoso!
            </h2>
            <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
              Tu pago ha sido procesado correctamente
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  No. de referencia
                </span>
                <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  {transactionRef}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  Fecha
                </span>
                <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  {transactionDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  Origen
                </span>
                <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  {origenAccount?.nickname} - {origenAccount?.accountNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  Tarjeta
                </span>
                <span className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                  {destinoCard?.nickname} - {destinoCard?.cardNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  Monto
                </span>
                <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                  {formatCurrency(parsedAmount)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              Finalizar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
