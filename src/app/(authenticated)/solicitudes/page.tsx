import React from 'react';
import { colors } from '@/styles/colors';

export default function Solicitudes() {
  const requests = [
    {
      id: 1,
      type: 'Tarjeta de Crédito',
      date: '05 Feb 2026',
      status: 'En proceso',
      statusColor: colors.warning,
    },
    {
      id: 2,
      type: 'Préstamo Personal',
      date: '01 Feb 2026',
      status: 'Aprobado',
      statusColor: colors.success,
    },
    {
      id: 3,
      type: 'Chequera',
      date: '28 Ene 2026',
      status: 'Completado',
      statusColor: colors.info,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Solicitudes
        </h1>
        <p className="text-gray-600 mt-2">
          Gestiona tus solicitudes de productos y servicios
        </p>
      </div>

      {/* Nueva Solicitud */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Nueva Solicitud
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className="p-6 border-2 rounded-lg hover:border-opacity-100 transition-all"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">💳</div>
              <div className="font-bold">Tarjeta de Crédito</div>
            </div>
          </button>
          <button
            className="p-6 border-2 rounded-lg hover:border-opacity-100 transition-all"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">💰</div>
              <div className="font-bold">Préstamo</div>
            </div>
          </button>
          <button
            className="p-6 border-2 rounded-lg hover:border-opacity-100 transition-all"
            style={{ borderColor: colors.primary, color: colors.primary }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">📄</div>
              <div className="font-bold">Chequera</div>
            </div>
          </button>
        </div>
      </div>

      {/* Solicitudes Recientes */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b" style={{ borderColor: colors.border }}>
          <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
            Solicitudes Recientes
          </h2>
        </div>
        <div className="divide-y" style={{ borderColor: colors.border }}>
          {requests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: colors.textPrimary }}>
                    {request.type}
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    Solicitado el {request.date}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: `${request.statusColor}20`,
                      color: request.statusColor,
                    }}
                  >
                    {request.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
