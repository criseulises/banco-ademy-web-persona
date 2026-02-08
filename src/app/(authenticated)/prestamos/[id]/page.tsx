'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { colors } from '@/styles/colors';
import { formatRelativeDate } from '@/utils/dateUtils';

type FilterType = 'todo' | 'pagadas' | 'pendientes';

interface Loan {
  id: string;
  userId: string;
  loanType: string;
  amount: number;
  currency: string;
  disbursedAmount: number;
  outstandingBalance: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayments: number;
  paidPayments: number;
  remainingPayments: number;
  overduePayments?: number;
  nextPaymentDate: string;
  startDate: string;
  endDate: string;
  status: string;
  purpose: string;
  nickname?: string;
  loanNumber?: string;
  guaranteeType: string;
  paymentDay: number;
  lastPaymentDate: string;
  lastPaymentAmount: number;
}

interface LoanPayment {
  id: string;
  loanId: string;
  paymentNumber: number;
  amount: number;
  principal: number;
  interest: number;
  dueDate: string;
  paidDate: string | null;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  reference: string;
}

export default function LoanDetailsPage() {
  const params = useParams();
  const loanId = params.id as string;

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('todo');
  const [loan, setLoan] = useState<Loan | null>(null);
  const [payments, setPayments] = useState<LoanPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos del préstamo
    Promise.all([
      fetch('/mock_data/loans.json').then(res => res.json()),
      fetch('/mock_data/loan_payments.json').then(res => res.json()),
    ])
      .then(([loansData, paymentsData]) => {
        // Buscar el préstamo por loanNumber
        const foundLoan = loansData.loans.find(
          (l: Loan) => l.loanNumber === loanId || l.id === loanId
        );
        setLoan(foundLoan || null);

        // Filtrar pagos de este préstamo
        const loanPayments = paymentsData.loanPayments.filter(
          (p: LoanPayment) => p.loanId === foundLoan?.id
        );
        setPayments(loanPayments);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading loan data:', error);
        setLoading(false);
      });
  }, [loanId]);

  const filteredPayments = payments.filter(p => {
    if (selectedFilter === 'todo') return true;
    if (selectedFilter === 'pagadas') return p.status === 'PAID';
    if (selectedFilter === 'pendientes') return p.status === 'PENDING' || p.status === 'OVERDUE';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando detalles de préstamo...</p>
        </div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.textPrimary }}>
            Préstamo no encontrado
          </h2>
          <p style={{ color: colors.textSecondary }}>
            No se pudo encontrar el préstamo solicitado
          </p>
        </div>
      </div>
    );
  }

  const paidPercentage = (loan.paidPayments / loan.totalPayments) * 100;
  const pendingPercentage = (loan.remainingPayments / loan.totalPayments) * 100;
  const overduePercentage = ((loan.overduePayments || 0) / loan.totalPayments) * 100;

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Detalles de préstamo
          </h1>
        </div>

        {/* Loan Details Section */}
        <div className="flex gap-6 mb-8">
          {/* Main Loan Card */}
          <div className="bg-white rounded-2xl p-6 flex-1">
            {/* Top Row - Title */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                  {loan.nickname || loan.purpose}
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
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Préstamo
              </p>
            </div>

            {/* Progress Bar Section */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-6 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5FBFC4' }}></div>
                  <span className="text-sm" style={{ color: colors.textPrimary }}>
                    {loan.paidPayments} Pagadas
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F7981D' }}></div>
                  <span className="text-sm" style={{ color: colors.textPrimary }}>
                    {loan.remainingPayments} Pendientes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF4444' }}></div>
                  <span className="text-sm" style={{ color: colors.textPrimary }}>
                    {loan.overduePayments || 0} Vencidas
                  </span>
                </div>
              </div>

              <div className="relative h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: colors.grey200 }}>
                <div
                  className="absolute h-full rounded-l-full"
                  style={{
                    backgroundColor: '#5FBFC4',
                    width: `${paidPercentage}%`,
                    left: 0,
                  }}
                />
                <div
                  className="absolute h-full"
                  style={{
                    backgroundColor: '#F7981D',
                    width: `${pendingPercentage}%`,
                    left: `${paidPercentage}%`,
                  }}
                />
                <div
                  className="absolute h-full rounded-r-full"
                  style={{
                    backgroundColor: '#FF4444',
                    width: `${overduePercentage}%`,
                    left: `${paidPercentage + pendingPercentage}%`,
                  }}
                />
              </div>
            </div>

            {/* Bottom Row - Loan Number and Stats */}
            <div className="flex items-center justify-between">
              <p className="text-base" style={{ color: colors.textPrimary }}>
                {loan.loanNumber}
              </p>

              <div className="flex items-center gap-12">
                <div className="text-center">
                  <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Tasa
                  </p>
                  <p className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
                    {loan.interestRate.toFixed(2)}%
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Capital original
                  </p>
                  <p className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
                    RD$ {loan.amount.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
                    Monto restante
                  </p>
                  <p className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
                    RD$ {loan.outstandingBalance.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Right Side */}
          <div className="flex flex-col gap-4">
            {/* Pagar Button */}
            <button className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-2 min-w-[140px] cursor-pointer transition-all hover:shadow-lg">
              <Image
                src="/icon/tabler/tabler-icon-receipt.svg"
                alt="Recibo"
                width={48}
                height={48}
                style={{
                  filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                }}
              />
              <span className="text-base font-bold" style={{ color: colors.primary }}>
                Pagar
              </span>
            </button>

            {/* Estado Button */}
            <button className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-2 min-w-[140px] cursor-pointer transition-all hover:shadow-lg">
              <Image
                src="/icon/tabler/tabler-icon-file-document.svg"
                alt="Estado"
                width={48}
                height={48}
                style={{
                  filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
                }}
              />
              <span className="text-base font-bold" style={{ color: colors.primary }}>
                Estado
              </span>
            </button>
          </div>
        </div>

        {/* Movements Section */}
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
              onClick={() => setSelectedFilter('pagadas')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedFilter === 'pagadas' ? 'font-semibold' : ''
              }`}
              style={{
                borderColor: selectedFilter === 'pagadas' ? '#FA6C26' : colors.grey300,
                backgroundColor: selectedFilter === 'pagadas' ? '#FA6C2610' : 'white',
                color: selectedFilter === 'pagadas' ? '#FA6C26' : colors.grey600,
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/tabler/tabler-icon-checks.svg"
                  alt="Pagadas"
                  width={16}
                  height={16}
                  style={{
                    filter: selectedFilter === 'pagadas'
                      ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3583%) hue-rotate(352deg) brightness(100%) contrast(97%)'
                      : 'brightness(0) saturate(0%) brightness(60%)',
                  }}
                />
                <span>Pagadas</span>
              </div>
            </button>

            <button
              onClick={() => setSelectedFilter('pendientes')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedFilter === 'pendientes' ? 'font-semibold' : ''
              }`}
              style={{
                borderColor: selectedFilter === 'pendientes' ? '#FA6C26' : colors.grey300,
                backgroundColor: selectedFilter === 'pendientes' ? '#FA6C2610' : 'white',
                color: selectedFilter === 'pendientes' ? '#FA6C26' : colors.grey600,
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/icon/tabler/tabler-icon-clock.svg"
                  alt="Pendientes"
                  width={16}
                  height={16}
                  style={{
                    filter: selectedFilter === 'pendientes'
                      ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3583%) hue-rotate(352deg) brightness(100%) contrast(97%)'
                      : 'brightness(0) saturate(0%) brightness(60%)',
                  }}
                />
                <span>Pendientes</span>
              </div>
            </button>
          </div>

          {/* Payments List */}
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-base" style={{ color: colors.grey500 }}>
                  No hay pagos para mostrar
                </p>
              </div>
            ) : (
              filteredPayments
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between py-4 border-b last:border-b-0"
                    style={{ borderColor: colors.grey200 }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: payment.status === 'PAID' ? '#5FBFC420' : '#F7981D20',
                        }}
                      >
                        {payment.status === 'PAID' ? (
                          <Image
                            src="/icon/tabler/tabler-icon-checks.svg"
                            alt="Pagado"
                            width={24}
                            height={24}
                            style={{
                              filter: 'brightness(0) saturate(100%) invert(59%) sepia(45%) saturate(388%) hue-rotate(137deg) brightness(91%) contrast(87%)',
                            }}
                          />
                        ) : (
                          <Image
                            src="/icon/tabler/tabler-icon-clock.svg"
                            alt="Pendiente"
                            width={24}
                            height={24}
                            style={{
                              filter: 'brightness(0) saturate(100%) invert(67%) sepia(60%) saturate(2037%) hue-rotate(349deg) brightness(103%) contrast(96%)',
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-base mb-1" style={{ color: colors.textPrimary }}>
                          {payment.status === 'PENDING' ? 'Próxima cuota' : `Pago cuota No. ${payment.paymentNumber}`}
                        </p>
                        <p className="text-sm" style={{ color: colors.grey500 }}>
                          {payment.reference}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className="text-2xl font-bold mb-1"
                        style={{
                          color: payment.status === 'PAID' ? '#5FBFC4' : '#F7981D',
                        }}
                      >
                        RD$ {payment.amount.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm" style={{ color: colors.grey500 }}>
                        {formatRelativeDate(payment.status === 'PAID' ? payment.paidDate! : payment.dueDate)}
                      </p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
