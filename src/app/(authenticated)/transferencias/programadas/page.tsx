'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

interface ScheduledTransfer {
  id: string;
  userId: string;
  type: 'PROPIA' | 'TERCERO';
  metodo?: 'ACH' | 'LBTR';
  origenAccountId: string;
  origenNickname: string;
  origenAccountNumber: string;
  destinoId: string;
  destinoName: string;
  destinoAccountNumber: string;
  destinoBankName: string;
  monto: number;
  concepto: string;
  frecuencia: 'DIARIA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';
  nextDate: string;
  startDate: string;
  status: string;
  createdAt: string;
}

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

interface Beneficiary {
  id: string;
  userId: string;
  type: string;
  name: string;
  nickname: string;
  accountNumber: string;
  bankName: string;
}

type TransferType = 'PROPIA' | 'TERCERO';
type Metodo = 'ACH' | 'LBTR';
type Frecuencia = 'DIARIA' | 'SEMANAL' | 'QUINCENAL' | 'MENSUAL';

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

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-DO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function AccountSelect({
  label,
  value,
  onChange,
  accounts,
  placeholder,
  error,
  excludeId,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  accounts: Account[];
  placeholder: string;
  error?: string;
  excludeId?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = accounts.find((a) => a.id === value);
  const options = accounts.filter((a) => a.id !== excludeId);

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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.primary, flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && options.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border" style={{ borderColor: colors.border }}>
            {options.map((account) => (
              <button
                key={account.id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => { onChange(account.id); setOpen(false); }}
              >
                <div className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{account.nickname}</div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  **** {account.accountNumber.slice(-4)} · {formatCurrency(account.availableBalance)}
                </div>
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-sm mt-1" style={{ color: colors.error }}>{error}</p>}
      </div>
    </div>
  );
}

function BeneficiarySelect({
  label,
  value,
  onChange,
  beneficiaries,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  beneficiaries: Beneficiary[];
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = beneficiaries.find((b) => b.id === value);

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
            {selected ? `${selected.name} - ${selected.accountNumber.slice(-4)}` : placeholder}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.primary, flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && beneficiaries.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border" style={{ borderColor: colors.border }}>
            {beneficiaries.map((ben) => (
              <button
                key={ben.id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => { onChange(ben.id); setOpen(false); }}
              >
                <div className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{ben.name}</div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  **** {ben.accountNumber.slice(-4)} · {ben.bankName}
                </div>
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-sm mt-1" style={{ color: colors.error }}>{error}</p>}
      </div>
    </div>
  );
}

function FrecuenciaSelect({
  value,
  onChange,
}: {
  value: Frecuencia;
  onChange: (v: Frecuencia) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options: Frecuencia[] = ['DIARIA', 'SEMANAL', 'QUINCENAL', 'MENSUAL'];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
        Frecuencia
      </label>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-3 border rounded-lg transition-all text-left bg-white"
          style={{ borderColor: colors.border }}
        >
          <span style={{ color: colors.textPrimary }}>{value}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.primary, flexShrink: 0 }}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {open && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border" style={{ borderColor: colors.border }}>
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                onClick={() => { onChange(opt); setOpen(false); }}
              >
                <span className="text-sm" style={{ color: colors.textPrimary }}>{opt}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransferenciasProgramadas() {
  const [transfers, setTransfers] = useState<ScheduledTransfer[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Dialogs
  const [detailTransfer, setDetailTransfer] = useState<ScheduledTransfer | null>(null);
  const [deleteTransfer, setDeleteTransfer] = useState<ScheduledTransfer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add form state
  const [addType, setAddType] = useState<TransferType>('PROPIA');
  const [addMetodo, setAddMetodo] = useState<Metodo>('ACH');
  const [addOrigen, setAddOrigen] = useState('');
  const [addDestinoCuenta, setAddDestinoCuenta] = useState('');
  const [addDestinoBeneficiario, setAddDestinoBeneficiario] = useState('');
  const [addMonto, setAddMonto] = useState('');
  const [addConcepto, setAddConcepto] = useState('');
  const [addFrecuencia, setAddFrecuencia] = useState<Frecuencia>('MENSUAL');
  const [addStartDate, setAddStartDate] = useState('');
  const [addErrors, setAddErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetch('/mock_data/scheduled_transfers.json').then((r) => r.json()),
      fetch('/mock_data/accounts.json').then((r) => r.json()),
      fetch('/mock_data/beneficiaries.json').then((r) => r.json()),
    ])
      .then(([transfersData, accountsData, beneficiariesData]) => {
        setTransfers(transfersData.scheduledTransfers.filter((t: ScheduledTransfer) => t.userId === 'user_001'));
        setAccounts(accountsData.accounts.filter((a: Account) => a.userId === 'user_001' && a.status === 'ACTIVE'));
        setBeneficiaries(beneficiariesData.beneficiaries.filter(
          (b: Beneficiary) => b.userId === 'user_001' && (b.type === 'CUENTA_ADEMI' || b.type === 'OTRA_CUENTA')
        ));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = transfers.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.origenNickname.toLowerCase().includes(q) ||
      t.destinoName.toLowerCase().includes(q) ||
      t.concepto.toLowerCase().includes(q)
    );
  });

  const handleDelete = (id: string) => {
    setTransfers((prev) => prev.filter((t) => t.id !== id));
    setDeleteTransfer(null);
  };

  const resetAddForm = () => {
    setAddType('PROPIA');
    setAddMetodo('ACH');
    setAddOrigen('');
    setAddDestinoCuenta('');
    setAddDestinoBeneficiario('');
    setAddMonto('');
    setAddConcepto('');
    setAddFrecuencia('MENSUAL');
    setAddStartDate('');
    setAddErrors({});
    setShowAddForm(false);
  };

  const validateAdd = () => {
    const errs: Record<string, string> = {};
    if (!addOrigen) errs.origen = 'Selecciona una cuenta origen';
    if (addType === 'PROPIA' && !addDestinoCuenta) errs.destino = 'Selecciona una cuenta destino';
    if (addType === 'TERCERO' && !addDestinoBeneficiario) errs.destino = 'Selecciona un beneficiario';
    if (addType === 'PROPIA' && addOrigen && addDestinoCuenta && addOrigen === addDestinoCuenta)
      errs.destino = 'La cuenta destino debe ser diferente a la origen';
    if (addType === 'TERCERO' && !addMetodo) errs.metodo = 'Selecciona un método';
    if (!addMonto || parseFloat(addMonto) <= 0) errs.monto = 'Ingresa un monto válido';
    if (!addStartDate) errs.startDate = 'Selecciona una fecha de inicio';
    setAddErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddSubmit = () => {
    if (!validateAdd()) return;

    const origenAcc = accounts.find((a) => a.id === addOrigen);
    let destinoName = '';
    let destinoAccountNumber = '';
    let destinoBankName = 'Banco ADEMI';
    let destinoId = '';

    if (addType === 'PROPIA') {
      const destAcc = accounts.find((a) => a.id === addDestinoCuenta);
      destinoName = destAcc?.nickname || '';
      destinoAccountNumber = destAcc?.accountNumber || '';
      destinoId = addDestinoCuenta;
    } else {
      const destBen = beneficiaries.find((b) => b.id === addDestinoBeneficiario);
      destinoName = destBen?.name || '';
      destinoAccountNumber = destBen?.accountNumber || '';
      destinoBankName = destBen?.bankName || 'Banco ADEMI';
      destinoId = addDestinoBeneficiario;
    }

    const newTransfer: ScheduledTransfer = {
      id: `sched_${Date.now()}`,
      userId: 'user_001',
      type: addType,
      metodo: addType === 'TERCERO' ? addMetodo : undefined,
      origenAccountId: addOrigen,
      origenNickname: origenAcc?.nickname || '',
      origenAccountNumber: origenAcc?.accountNumber || '',
      destinoId,
      destinoName,
      destinoAccountNumber,
      destinoBankName,
      monto: parseFloat(addMonto),
      concepto: addConcepto,
      frecuencia: addFrecuencia,
      nextDate: new Date(addStartDate).toISOString(),
      startDate: new Date(addStartDate).toISOString(),
      status: 'ACTIVA',
      createdAt: new Date().toISOString(),
    };

    setTransfers((prev) => [newTransfer, ...prev]);
    resetAddForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }} />
          <p style={{ color: colors.textSecondary }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Transferencias programadas
          </h1>
        </div>

        {/* Search + Add */}
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
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            Agregar
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p style={{ color: colors.textSecondary }}>
                {search ? 'No se encontraron transferencias' : 'No hay transferencias programadas'}
              </p>
            </div>
          ) : (
            filtered.map((transfer, index) => (
              <div
                key={transfer.id}
                className="flex items-center px-6 py-5 cursor-pointer hover:bg-gray-50 transition-colors"
                style={{
                  borderBottom: index < filtered.length - 1 ? `1px solid ${colors.grey200}` : undefined,
                }}
                onClick={() => setDetailTransfer(transfer)}
              >
                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                      Origen
                    </p>
                    <p className="text-sm" style={{ color: colors.textPrimary }}>
                      {transfer.origenNickname} - {transfer.origenAccountNumber.slice(-4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                      Destino
                    </p>
                    <p className="text-sm" style={{ color: colors.textPrimary }}>
                      {transfer.destinoName} - {transfer.destinoAccountNumber.slice(-4)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                      Monto
                    </p>
                    <p className="text-sm" style={{ color: colors.textPrimary }}>
                      {formatCurrency(transfer.monto)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: colors.primary }}>
                      Próxima fecha
                    </p>
                    <p className="text-sm" style={{ color: colors.textPrimary }}>
                      {new Date(transfer.nextDate).toLocaleDateString('es-DO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-4 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTransfer(transfer);
                  }}
                >
                  <Image
                    src="/icon/tabler/tabler-icon-trash.svg"
                    alt="Eliminar"
                    width={20}
                    height={20}
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(1500%) hue-rotate(340deg) brightness(95%) contrast(95%)',
                    }}
                  />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Detail Dialog ── */}
      {detailTransfer && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setDetailTransfer(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                Detalle transferencia
              </h2>
              <button
                onClick={() => setDetailTransfer(null)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.textPrimary }}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Tipo</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {detailTransfer.type === 'PROPIA' ? 'Transferencia propia' : 'Transferencia a tercero'}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Origen</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {detailTransfer.origenNickname} - {detailTransfer.origenAccountNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Destino</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {detailTransfer.destinoName} - {detailTransfer.destinoAccountNumber.slice(-4)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span style={{ color: colors.textSecondary }}>Banco destino</span>
                <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                  {detailTransfer.destinoBankName}
                </span>
              </div>
              {detailTransfer.metodo && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Método</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {detailTransfer.metodo}
                  </span>
                </div>
              )}
              {detailTransfer.concepto && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: colors.textSecondary }}>Concepto</span>
                  <span className="font-semibold text-right" style={{ color: colors.textPrimary }}>
                    {detailTransfer.concepto}
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-dashed" style={{ borderColor: colors.border }} />

            <div className="py-4 space-y-3">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Monto</span>
                <span className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                  {formatCurrency(detailTransfer.monto)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Frecuencia</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {detailTransfer.frecuencia}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Próxima fecha</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {formatDate(detailTransfer.nextDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Fecha inicio</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>
                  {formatDate(detailTransfer.startDate)}
                </span>
              </div>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <button
              type="button"
              onClick={() => {
                setDeleteTransfer(detailTransfer);
                setDetailTransfer(null);
              }}
              className="w-full py-3 rounded-xl font-semibold mt-6 flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ backgroundColor: '#FEE2E2', color: colors.error }}
            >
              <Image
                src="/icon/tabler/tabler-icon-trash.svg"
                alt="Eliminar"
                width={18}
                height={18}
                style={{
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(1500%) hue-rotate(340deg) brightness(95%) contrast(95%)',
                }}
              />
              Eliminar transferencia
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Dialog ── */}
      {deleteTransfer && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setDeleteTransfer(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 animate-scale-in text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FEE2E2' }}
            >
              <Image
                src="/icon/tabler/tabler-icon-trash.svg"
                alt="Eliminar"
                width={32}
                height={32}
                style={{
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(1500%) hue-rotate(340deg) brightness(95%) contrast(95%)',
                }}
              />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>
              Eliminar transferencia
            </h2>
            <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>
              ¿Estás seguro que deseas eliminar esta transferencia programada?
            </p>
            <p className="text-sm font-semibold mb-6" style={{ color: colors.textPrimary }}>
              {deleteTransfer.origenNickname} → {deleteTransfer.destinoName}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTransfer(null)}
                className="flex-1 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                style={{ borderColor: colors.border, color: colors.textSecondary }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteTransfer.id)}
                className="flex-1 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.error, color: 'white' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Form Dialog ── */}
      {showAddForm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={resetAddForm}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                Nueva transferencia programada
              </h2>
              <button
                onClick={resetAddForm}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.textPrimary }}>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <hr className="mb-6" style={{ borderColor: colors.border }} />

            {/* Tipo */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-3" style={{ color: colors.textPrimary }}>
                Tipo
              </label>
              <div className="flex gap-3">
                {(['PROPIA', 'TERCERO'] as TransferType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setAddType(t);
                      setAddDestinoCuenta('');
                      setAddDestinoBeneficiario('');
                      setAddErrors((prev) => ({ ...prev, destino: '' }));
                    }}
                    className="px-5 py-2 rounded-lg border-2 font-semibold transition-all text-sm"
                    style={{
                      borderColor: addType === t ? colors.primary : colors.border,
                      color: addType === t ? colors.primary : colors.textSecondary,
                      backgroundColor: 'white',
                    }}
                  >
                    {t === 'PROPIA' ? 'Propia' : 'A tercero'}
                  </button>
                ))}
              </div>
            </div>

            {/* Origen y Destino */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AccountSelect
                label="Origen"
                value={addOrigen}
                onChange={(id) => { setAddOrigen(id); setAddErrors((prev) => ({ ...prev, origen: '' })); }}
                accounts={accounts}
                placeholder="Selecciona un producto origen"
                error={addErrors.origen}
                excludeId={addType === 'PROPIA' ? addDestinoCuenta : undefined}
              />

              {addType === 'PROPIA' ? (
                <AccountSelect
                  label="Destino"
                  value={addDestinoCuenta}
                  onChange={(id) => { setAddDestinoCuenta(id); setAddErrors((prev) => ({ ...prev, destino: '' })); }}
                  accounts={accounts}
                  placeholder="Selecciona un producto destino"
                  error={addErrors.destino}
                  excludeId={addOrigen}
                />
              ) : (
                <BeneficiarySelect
                  label="Destino"
                  value={addDestinoBeneficiario}
                  onChange={(id) => { setAddDestinoBeneficiario(id); setAddErrors((prev) => ({ ...prev, destino: '' })); }}
                  beneficiaries={beneficiaries}
                  placeholder="Selecciona un producto destino"
                  error={addErrors.destino}
                />
              )}
            </div>

            {/* Monto y Concepto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Monto */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Monto
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: colors.primary }}>
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Digite el monto a transferir"
                    value={formatInputAmount(addMonto)}
                    onChange={(e) => {
                      setAddMonto(e.target.value.replace(/[^0-9.]/g, ''));
                      setAddErrors((prev) => ({ ...prev, monto: '' }));
                    }}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all"
                    style={{ borderColor: addErrors.monto ? colors.error : colors.border }}
                  />
                </div>
                {addErrors.monto && <p className="text-sm mt-1" style={{ color: colors.error }}>{addErrors.monto}</p>}
              </div>

              {/* Concepto */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Concepto
                </label>
                <input
                  type="text"
                  placeholder="Escribe un comentario"
                  value={addConcepto}
                  onChange={(e) => setAddConcepto(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all"
                  style={{ borderColor: colors.border }}
                />
              </div>
            </div>

            {/* Método, Fecha de inicio y Frecuencia */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Método (solo para transferencias a terceros) */}
              {addType === 'TERCERO' ? (
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                    Método
                  </label>
                  <div className="flex gap-3">
                    {(['ACH', 'LBTR'] as Metodo[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setAddMetodo(m);
                          setAddErrors((prev) => ({ ...prev, metodo: '' }));
                        }}
                        className="px-6 py-3 rounded-xl border-2 font-bold transition-all text-sm"
                        style={{
                          borderColor: addMetodo === m ? colors.primary : colors.grey400,
                          color: addMetodo === m ? colors.primary : colors.grey400,
                          backgroundColor: 'white',
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  {addErrors.metodo && <p className="text-sm mt-1" style={{ color: colors.error }}>{addErrors.metodo}</p>}
                </div>
              ) : (
                <div /> // Espacio vacío cuando no es TERCERO
              )}

              {/* Fecha inicio */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  value={addStartDate}
                  onChange={(e) => {
                    setAddStartDate(e.target.value);
                    setAddErrors((prev) => ({ ...prev, startDate: '' }));
                  }}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all"
                  style={{ borderColor: addErrors.startDate ? colors.error : colors.border, color: colors.textPrimary }}
                />
                {addErrors.startDate && <p className="text-sm mt-1" style={{ color: colors.error }}>{addErrors.startDate}</p>}
              </div>

              <FrecuenciaSelect value={addFrecuencia} onChange={setAddFrecuencia} />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={resetAddForm}
                className="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.secondary, color: 'white' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddSubmit}
                className="px-8 py-3 rounded-lg font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
