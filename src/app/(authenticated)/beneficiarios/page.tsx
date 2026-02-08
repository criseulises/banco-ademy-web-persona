import React from 'react';
import { colors } from '@/styles/colors';

export default function Beneficiarios() {
  const beneficiaries = [
    {
      id: 1,
      name: 'Juan Pérez',
      bank: 'Banco ADEMI',
      account: '***4567',
      type: 'Cuenta de Ahorro',
    },
    {
      id: 2,
      name: 'María López',
      bank: 'Banco Popular',
      account: '***8901',
      type: 'Cuenta Corriente',
    },
    {
      id: 3,
      name: 'Carlos Martínez',
      bank: 'Banco BHD León',
      account: '***2345',
      type: 'Cuenta de Ahorro',
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Beneficiarios
          </h1>
          <p className="text-gray-600 mt-2">
            Administra tus beneficiarios para transferencias rápidas
          </p>
        </div>
        <button
          className="px-6 py-3 rounded-lg text-white font-bold"
          style={{ backgroundColor: colors.primary }}
        >
          + Agregar Beneficiario
        </button>
      </div>

      {/* Lista de Beneficiarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beneficiaries.map((beneficiary) => (
          <div
            key={beneficiary.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: colors.primary + '20' }}>
                👤
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            <h3 className="text-lg font-bold mb-2" style={{ color: colors.textPrimary }}>
              {beneficiary.name}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  🏦 {beneficiary.bank}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  💳 {beneficiary.account}
                </span>
              </div>
              <div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: colors.grey100,
                    color: colors.textSecondary,
                  }}
                >
                  {beneficiary.type}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t" style={{ borderColor: colors.border }}>
              <button
                className="w-full px-4 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                Transferir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Información */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h3 className="font-bold mb-1" style={{ color: colors.textPrimary }}>
              Información sobre Beneficiarios
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Los beneficiarios te permiten realizar transferencias de manera más rápida y segura.
              Puedes agregar hasta 20 beneficiarios diferentes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
