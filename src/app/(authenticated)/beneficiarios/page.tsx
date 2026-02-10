'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';
import { useRouter } from 'next/navigation';

interface Beneficiary {
  id: string;
  userId: string;
  type: 'CUENTA_ADEMI' | 'OTRA_CUENTA' | 'SERVICIO';
  name: string;
  nickname: string;
  documentId?: string;
  accountNumber?: string;
  bankName?: string;
  bankCode?: string;
  email?: string | null;
  phone?: string;
  contractNumber?: string;
  serviceProvider?: string;
  serviceType?: string;
  addedDate: string;
  isFavorite: boolean;
  lastTransactionDate?: string;
}

type FilterType = 'TODOS' | 'CUENTA_ADEMI' | 'OTRA_CUENTA' | 'SERVICIO';
type DialogType = 'none' | 'add' | 'edit' | 'delete';

const BANKS = [
  'Banco ADEMI',
  'Banco BHD León',
  'Banco Popular Dominicano',
  'Banco de Reservas',
  'Scotiabank',
  'Banco Promerica',
  'Citibank',
  'Banco Santa Cruz',
];

const SERVICE_TYPES = [
  { value: 'ELECTRICIDAD', label: 'Electricidad' },
  { value: 'AGUA', label: 'Agua' },
  { value: 'TELEFONIA', label: 'Telefonía' },
  { value: 'INTERNET', label: 'Internet' },
  { value: 'GAS', label: 'Gas' },
  { value: 'TV_CABLE', label: 'TV Cable' },
];

const AVATAR_COLORS = [
  { bg: '#E0F7FA', text: '#00838F' },
  { bg: '#E8F5E9', text: '#2E7D32' },
  { bg: '#E3F2FD', text: '#1565C0' },
  { bg: '#FFF3E0', text: '#E65100' },
  { bg: '#F3E5F5', text: '#6A1B9A' },
  { bg: '#FCE4EC', text: '#AD1457' },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

function getTypeBadge(type: string): { label: string; bg: string; color: string } {
  switch (type) {
    case 'CUENTA_ADEMI':
      return { label: 'ADEMI', bg: colors.primary + '20', color: colors.primary };
    case 'OTRA_CUENTA':
      return { label: 'Otro banco', bg: colors.secondary + '20', color: colors.secondary };
    case 'SERVICIO':
      return { label: 'Servicio', bg: '#4CAF5020', color: '#2E7D32' };
    default:
      return { label: type, bg: colors.grey100, color: colors.textSecondary };
  }
}

const emptyForm = {
  type: 'CUENTA_ADEMI' as 'CUENTA_ADEMI' | 'OTRA_CUENTA' | 'SERVICIO',
  name: '',
  nickname: '',
  documentId: '',
  accountNumber: '',
  bankName: '',
  email: '',
  phone: '',
  contractNumber: '',
  serviceProvider: '',
  serviceType: '',
};

export default function Beneficiarios() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('TODOS');
  const [dialog, setDialog] = useState<DialogType>('none');
  const [selected, setSelected] = useState<Beneficiary | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    fetch('/mock_data/beneficiaries.json')
      .then((r) => r.json())
      .then((data) => {
        setBeneficiaries(data.beneficiaries.filter((b: Beneficiary) => b.userId === 'user_001'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const filtered = beneficiaries.filter((b) => {
    const matchSearch =
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.nickname.toLowerCase().includes(search.toLowerCase()) ||
      (b.bankName && b.bankName.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'TODOS' || b.type === filter;
    return matchSearch && matchFilter;
  });

  const openAdd = () => {
    setForm({ ...emptyForm });
    setFormErrors({});
    setDialog('add');
  };

  const openEdit = (b: Beneficiary) => {
    setSelected(b);
    setForm({
      type: b.type,
      name: b.name,
      nickname: b.nickname,
      documentId: b.documentId || '',
      accountNumber: b.accountNumber || '',
      bankName: b.bankName || '',
      email: b.email || '',
      phone: b.phone || '',
      contractNumber: b.contractNumber || '',
      serviceProvider: b.serviceProvider || '',
      serviceType: b.serviceType || '',
    });
    setFormErrors({});
    setMenuOpen(null);
    setDialog('edit');
  };

  const openDelete = (b: Beneficiary) => {
    setSelected(b);
    setMenuOpen(null);
    setDialog('delete');
  };

  const closeDialog = () => {
    setDialog('none');
    setSelected(null);
    setFormErrors({});
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'El nombre es requerido';
    if (!form.nickname.trim()) errs.nickname = 'El alias es requerido';
    if (form.type !== 'SERVICIO') {
      if (!form.accountNumber.trim()) errs.accountNumber = 'El número de cuenta es requerido';
      if (!form.documentId.trim()) errs.documentId = 'La cédula / RNC es requerida';
      if (form.type === 'OTRA_CUENTA' && !form.bankName) errs.bankName = 'El banco es requerido';
    } else {
      if (!form.serviceType) errs.serviceType = 'El tipo de servicio es requerido';
      if (!form.serviceProvider.trim()) errs.serviceProvider = 'El proveedor es requerido';
      if (!form.contractNumber.trim()) errs.contractNumber = 'El número de contrato es requerido';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (dialog === 'add') {
      const newBen: Beneficiary = {
        id: `ben_${Date.now()}`,
        userId: 'user_001',
        type: form.type,
        name: form.name.trim(),
        nickname: form.nickname.trim(),
        documentId: form.documentId || undefined,
        accountNumber: form.accountNumber || undefined,
        bankName: form.type === 'CUENTA_ADEMI' ? 'Banco ADEMI' : form.bankName || undefined,
        bankCode: form.type === 'CUENTA_ADEMI' ? 'ADEMI' : undefined,
        email: form.email || null,
        phone: form.phone || undefined,
        contractNumber: form.contractNumber || undefined,
        serviceProvider: form.serviceProvider || undefined,
        serviceType: form.serviceType || undefined,
        addedDate: new Date().toISOString(),
        isFavorite: false,
      };
      setBeneficiaries((prev) => [...prev, newBen]);
    } else if (dialog === 'edit' && selected) {
      setBeneficiaries((prev) =>
        prev.map((b) =>
          b.id === selected.id
            ? {
                ...b,
                name: form.name.trim(),
                nickname: form.nickname.trim(),
                documentId: form.documentId || undefined,
                accountNumber: form.accountNumber || undefined,
                bankName:
                  form.type === 'CUENTA_ADEMI' ? 'Banco ADEMI' : form.bankName || undefined,
                email: form.email || null,
                phone: form.phone || undefined,
                contractNumber: form.contractNumber || undefined,
                serviceProvider: form.serviceProvider || undefined,
                serviceType: form.serviceType || undefined,
              }
            : b
        )
      );
    }
    closeDialog();
  };

  const handleDelete = () => {
    if (!selected) return;
    setBeneficiaries((prev) => prev.filter((b) => b.id !== selected.id));
    closeDialog();
  };

  const toggleFavorite = (id: string) => {
    setBeneficiaries((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isFavorite: !b.isFavorite } : b))
    );
  };

  const handleTransfer = (b: Beneficiary) => {
    router.push(`/transferencias/terceros?beneficiario=${b.id}`);
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
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
              Beneficiarios
            </h1>
            <p className="mt-1 text-sm" style={{ color: colors.textSecondary }}>
              Administra tus beneficiarios para transferencias rápidas
            </p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            <Image
              src="/icon/tabler/tabler-icon-category-plus.svg"
              alt=""
              width={20}
              height={20}
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            Nuevo beneficiario
          </button>
        </div>

        {/* Search + Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: colors.textHint }}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, alias o banco..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none text-sm"
              style={{ borderColor: colors.border }}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'TODOS', label: 'Todos' },
              { key: 'CUENTA_ADEMI', label: 'ADEMI' },
              { key: 'OTRA_CUENTA', label: 'Otros bancos' },
              { key: 'SERVICIO', label: 'Servicios' },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as FilterType)}
                className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: filter === f.key ? colors.primary : 'transparent',
                  color: filter === f.key ? 'white' : colors.textSecondary,
                  border: `1.5px solid ${filter === f.key ? colors.primary : colors.border}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center">
              <Image
                src="/icon/tabler/tabler-icon-users.svg"
                alt=""
                width={48}
                height={48}
                style={{ filter: 'brightness(0) saturate(100%) invert(80%)' }}
              />
            </div>
            <p className="text-lg font-semibold" style={{ color: colors.textSecondary }}>
              {search ? 'No se encontraron beneficiarios' : 'Aún no tienes beneficiarios'}
            </p>
            {!search && (
              <button
                onClick={openAdd}
                className="mt-4 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Agregar tu primer beneficiario
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((b) => {
              const initials = getInitials(b.name);
              const avatarColor = getAvatarColor(b.name);
              const badge = getTypeBadge(b.type);
              const isService = b.type === 'SERVICIO';
              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0"
                        style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="font-bold text-sm leading-tight truncate"
                          style={{ color: colors.textPrimary }}
                        >
                          {b.name}
                        </h3>
                        <span className="text-xs" style={{ color: colors.textSecondary }}>
                          {b.nickname}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => toggleFavorite(b.id)}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        title={b.isFavorite ? 'Quitar de favoritos' : 'Marcar favorito'}
                      >
                        {b.isFavorite ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{ color: colors.secondary }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ color: colors.textHint }}
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        )}
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(menuOpen === b.id ? null : b.id);
                          }}
                          className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{ color: colors.textSecondary }}
                          >
                            <circle cx="12" cy="5" r="1.5" />
                            <circle cx="12" cy="12" r="1.5" />
                            <circle cx="12" cy="19" r="1.5" />
                          </svg>
                        </button>
                        {menuOpen === b.id && (
                          <div
                            className="absolute right-0 top-9 bg-white rounded-xl shadow-lg border z-10 py-1 min-w-[140px]"
                            style={{ borderColor: colors.border }}
                          >
                            <button
                              onClick={() => openEdit(b)}
                              className="w-full text-left px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 text-sm"
                              style={{ color: colors.textPrimary }}
                            >
                              <Image
                                src="/icon/tabler/tabler-icon-edit.svg"
                                alt=""
                                width={16}
                                height={16}
                              />
                              Editar
                            </button>
                            <button
                              onClick={() => openDelete(b)}
                              className="w-full text-left px-4 py-2.5 flex items-center gap-2 hover:bg-gray-50 text-sm"
                              style={{ color: colors.error }}
                            >
                              <Image
                                src="/icon/tabler/tabler-icon-trash.svg"
                                alt=""
                                width={16}
                                height={16}
                                style={{
                                  filter:
                                    'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(1500%) hue-rotate(340deg) brightness(95%) contrast(95%)',
                                }}
                              />
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    {b.bankName && (
                      <div className="flex items-center gap-2">
                        <Image
                          src="/icon/tabler/tabler-icon-id.svg"
                          alt=""
                          width={14}
                          height={14}
                          style={{ filter: 'brightness(0) saturate(100%) invert(60%)' }}
                        />
                        <span className="text-xs" style={{ color: colors.textSecondary }}>
                          {b.bankName}
                        </span>
                      </div>
                    )}
                    {b.accountNumber && (
                      <div className="flex items-center gap-2">
                        <Image
                          src="/icon/tabler/tabler-icon-credit-card.svg"
                          alt=""
                          width={14}
                          height={14}
                          style={{ filter: 'brightness(0) saturate(100%) invert(60%)' }}
                        />
                        <span className="text-xs" style={{ color: colors.textSecondary }}>
                          **** {b.accountNumber.slice(-4)}
                        </span>
                      </div>
                    )}
                    {b.contractNumber && (
                      <div className="flex items-center gap-2">
                        <Image
                          src="/icon/tabler/tabler-icon-receipt.svg"
                          alt=""
                          width={14}
                          height={14}
                          style={{ filter: 'brightness(0) saturate(100%) invert(60%)' }}
                        />
                        <span className="text-xs" style={{ color: colors.textSecondary }}>
                          Contrato: {b.contractNumber}
                        </span>
                      </div>
                    )}
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mt-0.5"
                      style={{ backgroundColor: badge.bg, color: badge.color }}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
                    <button
                      onClick={() => !isService && handleTransfer(b)}
                      disabled={isService}
                      className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: isService ? colors.grey100 : colors.primary,
                        color: isService ? colors.textSecondary : 'white',
                      }}
                    >
                      <Image
                        src="/icon/tabler/tabler-icon-arrows-exchange-2.svg"
                        alt=""
                        width={16}
                        height={16}
                        style={{
                          filter: isService
                            ? 'brightness(0) saturate(100%) invert(60%)'
                            : 'brightness(0) invert(1)',
                        }}
                      />
                      Transferir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info banner */}
        <div
          className="mt-6 rounded-2xl p-4 flex gap-3"
          style={{ backgroundColor: colors.primary + '10' }}
        >
          <div className="mt-0.5 flex-shrink-0">
            <Image
              src="/icon/tabler/tabler-icon-bulb.svg"
              alt=""
              width={20}
              height={20}
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)',
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: colors.primary }}>
              Información sobre beneficiarios
            </p>
            <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
              Los beneficiarios te permiten realizar transferencias de manera más rápida y segura.
              Puedes agregar hasta 20 beneficiarios diferentes.
            </p>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar menús desplegables */}
      {menuOpen && (
        <div className="fixed inset-0 z-5" onClick={() => setMenuOpen(null)} />
      )}

      {/* ── Add / Edit Dialog ── */}
      {(dialog === 'add' || dialog === 'edit') && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeDialog}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                {dialog === 'add' ? 'Nuevo beneficiario' : 'Editar beneficiario'}
              </h2>
              <button
                onClick={closeDialog}
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

            <div className="py-4 space-y-4">
              {/* Type selector */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: colors.textPrimary }}
                >
                  Tipo de beneficiario
                </label>
                <div className="flex gap-2">
                  {[
                    { value: 'CUENTA_ADEMI', label: 'ADEMI' },
                    { value: 'OTRA_CUENTA', label: 'Otro banco' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          type: t.value as 'CUENTA_ADEMI' | 'OTRA_CUENTA',
                        })
                      }
                      className="flex-1 py-2.5 rounded-lg border-2 font-semibold text-sm transition-all"
                      style={{
                        borderColor: form.type === t.value ? colors.primary : colors.border,
                        color: form.type === t.value ? colors.primary : colors.textSecondary,
                        backgroundColor: form.type === t.value ? colors.primary + '08' : 'white',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: colors.textPrimary }}
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setFormErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  placeholder="Ej. Juan Pérez García"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: formErrors.name ? colors.error : colors.border }}
                />
                {formErrors.name && (
                  <p className="text-xs mt-1" style={{ color: colors.error }}>
                    {formErrors.name}
                  </p>
                )}
              </div>

              {/* Alias */}
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: colors.textPrimary }}
                >
                  Alias
                </label>
                <input
                  type="text"
                  value={form.nickname}
                  onChange={(e) => {
                    setForm({ ...form, nickname: e.target.value });
                    setFormErrors((prev) => ({ ...prev, nickname: '' }));
                  }}
                  placeholder="Ej. Juan - BHD"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                  style={{ borderColor: formErrors.nickname ? colors.error : colors.border }}
                />
                {formErrors.nickname && (
                  <p className="text-xs mt-1" style={{ color: colors.error }}>
                    {formErrors.nickname}
                  </p>
                )}
              </div>

              {/* Fields for CUENTA_ADEMI / OTRA_CUENTA */}
              {(form.type === 'CUENTA_ADEMI' || form.type === 'OTRA_CUENTA') && (
                <>
                  {form.type === 'OTRA_CUENTA' && (
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: colors.textPrimary }}
                      >
                        Banco
                      </label>
                      <select
                        value={form.bankName}
                        onChange={(e) => {
                          setForm({ ...form, bankName: e.target.value });
                          setFormErrors((prev) => ({ ...prev, bankName: '' }));
                        }}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm bg-white"
                        style={{
                          borderColor: formErrors.bankName ? colors.error : colors.border,
                          color: form.bankName ? colors.textPrimary : colors.textHint,
                        }}
                      >
                        <option value="">Selecciona un banco</option>
                        {BANKS.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                      {formErrors.bankName && (
                        <p className="text-xs mt-1" style={{ color: colors.error }}>
                          {formErrors.bankName}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: colors.textPrimary }}
                    >
                      Número de cuenta
                    </label>
                    <input
                      type="text"
                      value={form.accountNumber}
                      onChange={(e) => {
                        setForm({ ...form, accountNumber: e.target.value.replace(/\D/g, '') });
                        setFormErrors((prev) => ({ ...prev, accountNumber: '' }));
                      }}
                      placeholder="Número de cuenta"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                      style={{
                        borderColor: formErrors.accountNumber ? colors.error : colors.border,
                      }}
                    />
                    {formErrors.accountNumber && (
                      <p className="text-xs mt-1" style={{ color: colors.error }}>
                        {formErrors.accountNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: colors.textPrimary }}
                    >
                      Cédula / RNC
                    </label>
                    <input
                      type="text"
                      value={form.documentId}
                      onChange={(e) => {
                        setForm({ ...form, documentId: e.target.value });
                        setFormErrors((prev) => ({ ...prev, documentId: '' }));
                      }}
                      placeholder="Ej. 001-1234567-8"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                      style={{ borderColor: formErrors.documentId ? colors.error : colors.border }}
                    />
                    {formErrors.documentId && (
                      <p className="text-xs mt-1" style={{ color: colors.error }}>
                        {formErrors.documentId}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: colors.textPrimary }}
                      >
                        Email{' '}
                        <span className="font-normal" style={{ color: colors.textHint }}>
                          (opcional)
                        </span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@ejemplo.com"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                        style={{ borderColor: colors.border }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold mb-1.5"
                        style={{ color: colors.textPrimary }}
                      >
                        Teléfono{' '}
                        <span className="font-normal" style={{ color: colors.textHint }}>
                          (opcional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(809) 000-0000"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                        style={{ borderColor: colors.border }}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Fields for SERVICIO */}
              {form.type === 'SERVICIO' && (
                <>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: colors.textPrimary }}
                    >
                      Tipo de servicio
                    </label>
                    <select
                      value={form.serviceType}
                      onChange={(e) => {
                        setForm({ ...form, serviceType: e.target.value });
                        setFormErrors((prev) => ({ ...prev, serviceType: '' }));
                      }}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm bg-white"
                      style={{
                        borderColor: formErrors.serviceType ? colors.error : colors.border,
                        color: form.serviceType ? colors.textPrimary : colors.textHint,
                      }}
                    >
                      <option value="">Selecciona el tipo</option>
                      {SERVICE_TYPES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.serviceType && (
                      <p className="text-xs mt-1" style={{ color: colors.error }}>
                        {formErrors.serviceType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: colors.textPrimary }}
                    >
                      Proveedor
                    </label>
                    <input
                      type="text"
                      value={form.serviceProvider}
                      onChange={(e) => {
                        setForm({ ...form, serviceProvider: e.target.value });
                        setFormErrors((prev) => ({ ...prev, serviceProvider: '' }));
                      }}
                      placeholder="Ej. EDESUR, Claro, etc."
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                      style={{
                        borderColor: formErrors.serviceProvider ? colors.error : colors.border,
                      }}
                    />
                    {formErrors.serviceProvider && (
                      <p className="text-xs mt-1" style={{ color: colors.error }}>
                        {formErrors.serviceProvider}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: colors.textPrimary }}
                    >
                      Número de contrato
                    </label>
                    <input
                      type="text"
                      value={form.contractNumber}
                      onChange={(e) => {
                        setForm({ ...form, contractNumber: e.target.value });
                        setFormErrors((prev) => ({ ...prev, contractNumber: '' }));
                      }}
                      placeholder="Número de contrato o cuenta"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none text-sm"
                      style={{
                        borderColor: formErrors.contractNumber ? colors.error : colors.border,
                      }}
                    />
                    {formErrors.contractNumber && (
                      <p className="text-xs mt-1" style={{ color: colors.error }}>
                        {formErrors.contractNumber}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeDialog}
                className="flex-1 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.grey100, color: colors.textPrimary }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                {dialog === 'add' ? 'Agregar' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Dialog ── */}
      {dialog === 'delete' && selected && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={closeDialog}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                Eliminar beneficiario
              </h2>
              <button
                onClick={closeDialog}
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

            <div className="py-6 flex flex-col items-center text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: colors.error + '15' }}
              >
                <Image
                  src="/icon/tabler/tabler-icon-trash.svg"
                  alt=""
                  width={32}
                  height={32}
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(27%) sepia(89%) saturate(1500%) hue-rotate(340deg) brightness(95%) contrast(95%)',
                  }}
                />
              </div>
              <p className="text-base" style={{ color: colors.textSecondary }}>
                ¿Estás seguro que deseas eliminar a
              </p>
              <p className="font-bold text-lg mt-1" style={{ color: colors.textPrimary }}>
                {selected.name}
              </p>
              <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
                Esta acción no se puede deshacer.
              </p>
            </div>

            <hr style={{ borderColor: colors.border }} />

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeDialog}
                className="flex-1 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: colors.grey100, color: colors.textPrimary }}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: colors.error }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
