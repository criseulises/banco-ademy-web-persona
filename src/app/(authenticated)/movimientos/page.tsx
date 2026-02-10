'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  type: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  reference: string;
  date: string;
  status: string;
  balance: number;
  recipient?: {
    name: string;
    accountNumber: string;
  };
  sender?: {
    name: string;
    accountNumber: string;
  };
  merchant?: string;
  billerName?: string;
  contractNumber?: string;
  location?: string;
  employer?: string;
  loanId?: string;
  cardId?: string;
}

interface Account {
  id: string;
  accountNumber: string;
  nickname: string;
}

type PeriodFilter = '30' | '60' | '90' | 'all';

function formatCurrency(amount: number) {
  return `RD$ ${Math.abs(amount).toLocaleString('es-DO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-DO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString('es-DO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function PeriodSelect({
  value,
  onChange,
}: {
  value: PeriodFilter;
  onChange: (value: PeriodFilter) => void;
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

  const options: { value: PeriodFilter; label: string }[] = [
    { value: '30', label: 'Últimos 30 días' },
    { value: '60', label: 'Últimos 60 días' },
    { value: '90', label: 'Últimos 90 días' },
    { value: 'all', label: 'Todos' },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-6 py-3 border-2 rounded-lg transition-all font-semibold"
        style={{
          borderColor: colors.secondary,
          color: colors.secondary,
          backgroundColor: 'white',
        }}
      >
        {selected?.label}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: colors.secondary }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-10 right-0 mt-1 bg-white rounded-lg shadow-lg border min-w-[200px]"
          style={{ borderColor: colors.border }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{
                  color: value === option.value ? colors.primary : colors.textPrimary,
                }}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Movimientos() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState<PeriodFilter>('30');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/mock_data/transactions.json').then((r) => r.json()),
      fetch('/mock_data/accounts.json').then((r) => r.json()),
    ])
      .then(([transactionsData, accountsData]) => {
        setTransactions(
          transactionsData.transactions.filter((t: Transaction) => t.userId === 'user_001')
        );
        setAccounts(
          accountsData.accounts
            .filter((a: Account) => a.userId === 'user_001')
            .map((a: Account) => ({
              id: a.id,
              accountNumber: a.accountNumber,
              nickname: a.nickname,
            }))
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch =
      t.description.toLowerCase().includes(q) ||
      t.reference.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (period === 'all') return true;

    const days = parseInt(period);
    const transactionDate = new Date(t.date);
    const today = new Date();
    const daysAgo = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

    return transactionDate >= daysAgo;
  });

  const getAccountNickname = (accountId: string) => {
    const account = accounts.find((a) => a.id === accountId);
    return account ? `${account.nickname} - ${account.accountNumber.slice(-4)}` : 'N/A';
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
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Histórico de movimientos
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white focus:outline-none transition-all"
              style={{ borderColor: colors.border }}
            />
          </div>
          <PeriodSelect value={period} onChange={setPeriod} />
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p style={{ color: colors.textSecondary }}>
                {search ? 'No se encontraron movimientos' : 'No hay movimientos'}
              </p>
            </div>
          ) : (
            filtered.map((transaction, index) => {
              const isIncome = transaction.amount > 0;
              return (
                <div
                  key={transaction.id}
                  className="flex items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{
                    borderBottom:
                      index < filtered.length - 1 ? `1px solid ${colors.grey200}` : undefined,
                  }}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  {/* Icon */}
                  <div className="mr-4">
                    {isIncome ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{ color: colors.success }}
                      >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{ color: colors.error }}
                      >
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1 grid grid-cols-5 gap-4">
                    {/* Fecha */}
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                        Fecha
                      </p>
                      <p className="text-sm" style={{ color: colors.textPrimary }}>
                        {formatDate(transaction.date)}
                      </p>
                    </div>

                    {/* Origen */}
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                        Origen
                      </p>
                      <p className="text-sm" style={{ color: colors.textPrimary }}>
                        {getAccountNickname(transaction.accountId)}
                      </p>
                    </div>

                    {/* Destino */}
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                        Destino
                      </p>
                      <p className="text-sm" style={{ color: colors.textPrimary }}>
                        {transaction.recipient?.name ||
                          transaction.merchant ||
                          transaction.billerName ||
                          transaction.description}
                      </p>
                    </div>

                    {/* Código */}
                    <div>
                      <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                        Código
                      </p>
                      <p className="text-sm" style={{ color: colors.textPrimary }}>
                        {transaction.reference}
                      </p>
                    </div>

                    {/* Monto */}
                    <div className="text-right">
                      <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                        Monto
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: isIncome ? colors.success : colors.error }}
                      >
                        {isIncome ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Dialog */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                Detalle de movimiento
              </h2>
              <button
                onClick={() => setSelectedTransaction(null)}
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
                <span style={{ color: colors.textSecondary }}>Tipo de transacción</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {selectedTransaction.type.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Fecha y hora</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {formatDateTime(selectedTransaction.date)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Referencia</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {selectedTransaction.reference}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Estado</span>
                <span
                  className="font-semibold text-right px-3 py-1 rounded-full text-xs"
                  style={{
                    backgroundColor: '#D1FAE5',
                    color: colors.success,
                  }}
                >
                  {selectedTransaction.status}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Cuenta</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {getAccountNickname(selectedTransaction.accountId)}
                </span>
              </div>
              {selectedTransaction.recipient && (
                <>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textSecondary }}>Destinatario</span>
                    <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                      {selectedTransaction.recipient.name}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textSecondary }}>Cuenta destino</span>
                    <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                      {selectedTransaction.recipient.accountNumber}
                    </span>
                  </div>
                </>
              )}
              {selectedTransaction.sender && (
                <>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textSecondary }}>Remitente</span>
                    <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                      {selectedTransaction.sender.name}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span style={{ color: colors.textSecondary }}>Cuenta origen</span>
                    <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                      {selectedTransaction.sender.accountNumber}
                    </span>
                  </div>
                </>
              )}
              {selectedTransaction.merchant && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Comercio</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {selectedTransaction.merchant}
                  </span>
                </div>
              )}
              {selectedTransaction.billerName && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Proveedor</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {selectedTransaction.billerName}
                  </span>
                </div>
              )}
              {selectedTransaction.location && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Ubicación</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {selectedTransaction.location}
                  </span>
                </div>
              )}
              {selectedTransaction.employer && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Empleador</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {selectedTransaction.employer}
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Descripción</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {selectedTransaction.description}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed" style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-2">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Monto</span>
                <span
                  className="font-bold text-lg"
                  style={{
                    color:
                      selectedTransaction.amount > 0 ? colors.success : colors.error,
                  }}
                >
                  {selectedTransaction.amount > 0 ? '+' : '-'}
                  {formatCurrency(selectedTransaction.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Balance después</span>
                <span className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                  {formatCurrency(selectedTransaction.balance)}
                </span>
              </div>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <button
              type="button"
              onClick={() => setSelectedTransaction(null)}
              className="w-full py-3 rounded-lg font-semibold mt-6 transition-all hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: 'white' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
