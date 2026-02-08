'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

type FilterType = 'todo' | 'credito' | 'debito';

interface Transaction {
  id: string;
  type: 'credito' | 'debito';
  title: string;
  reference: string;
  amount: number;
  date: string;
}

export default function AccountDetailsPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('todo');

  // Mock data - en producción vendría del servidor
  const account = {
    id: '001010286647359',
    name: 'Primera casa',
    type: 'Cuenta de ahorro',
    balance: 248556.32,
    icon: '/icon/custom/pig.svg',
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credito',
      title: 'Depósito mensual',
      reference: '20250621974316',
      amount: 10000.00,
      date: '26 de junio, 2025',
    },
    {
      id: '2',
      type: 'debito',
      title: 'Pago préstamo lavadora',
      reference: '20250621947862',
      amount: 3204.63,
      date: '26 de junio, 2025',
    },
    {
      id: '3',
      type: 'credito',
      title: 'Depósito mensual',
      reference: '20250621974316',
      amount: 10000.00,
      date: '26 de junio, 2025',
    },
    {
      id: '4',
      type: 'credito',
      title: 'Depósito mensual',
      reference: '20250621974316',
      amount: 10000.00,
      date: '26 de junio, 2025',
    },
  ];

  const filteredTransactions = transactions.filter(t => {
    if (selectedFilter === 'todo') return true;
    return t.type === selectedFilter;
  });

  const actionButtons = [
    { label: 'Transferir', icon: '/icon/tabler/tabler-icon-arrows-exchange-2.svg' },
    { label: 'Pagar', icon: '/icon/tabler/tabler-icon-file-pay.svg' },
    { label: 'Estado', icon: '/icon/tabler/tabler-icon-file-document.svg' },
    { label: 'Compartir', icon: '/icon/tabler/tabler-icon-share-3.svg' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Detalles de cuenta
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Account Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                      {account.name}
                    </h2>
                    <Image
                      src="/icon/tabler/tabler-icon-edit.svg"
                      alt="Editar"
                      width={20}
                      height={20}
                      className="cursor-pointer opacity-60 hover:opacity-100"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                      }}
                    />
                  </div>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {account.type}
                  </p>
                </div>
                <Image
                  src={account.icon}
                  alt={account.type}
                  width={56}
                  height={56}
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                  }}
                />
              </div>

              <div className="flex items-end justify-between mt-auto">
                <p className="text-sm" style={{ color: colors.grey500 }}>
                  {account.id}
                </p>
                <p className="text-5xl font-bold" style={{ color: colors.textPrimary }}>
                  RD$ {account.balance.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-4 h-full">
              {actionButtons.map((button, index) => (
                <button
                  key={index}
                  className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:scale-105"
                >
                  <Image
                    src={button.icon}
                    alt={button.label}
                    width={32}
                    height={32}
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                    }}
                  />
                  <span className="text-sm font-bold" style={{ color: colors.textPrimary }}>
                    {button.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Movements Section - Full Width */}
        <div className="bg-white rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
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
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                    style={{ borderColor: colors.grey200 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: transaction.type === 'credito' ? '#0095A920' : '#FF444420',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={transaction.type === 'credito' ? '#0095A9' : '#FF4444'}
                          strokeWidth="2"
                        >
                          {transaction.type === 'credito' ? (
                            <path d="M12 19V5M5 12l7-7 7 7" />
                          ) : (
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                          )}
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: colors.textPrimary }}>
                          {transaction.title}
                        </p>
                        <p className="text-sm" style={{ color: colors.grey500 }}>
                          {transaction.reference}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className="text-lg font-bold"
                        style={{
                          color: transaction.type === 'credito' ? '#0095A9' : '#FF4444',
                        }}
                      >
                        RD$ {transaction.amount.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm" style={{ color: colors.grey500 }}>
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </div>
    </div>
  );
}
