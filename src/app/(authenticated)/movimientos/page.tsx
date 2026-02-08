import React from 'react';
import { colors } from '@/styles/colors';

export default function Movimientos() {
  const transactions = [
    {
      id: 1,
      date: '08 Feb 2026',
      description: 'Transferencia a Juan Pérez',
      type: 'Transferencia',
      amount: -5000.00,
      balance: 243556.32,
    },
    {
      id: 2,
      date: '07 Feb 2026',
      description: 'Pago de servicios - Electricidad',
      type: 'Pago',
      amount: -1200.50,
      balance: 248556.32,
    },
    {
      id: 3,
      date: '06 Feb 2026',
      description: 'Depósito por nómina',
      type: 'Depósito',
      amount: 50000.00,
      balance: 249756.82,
    },
    {
      id: 4,
      date: '05 Feb 2026',
      description: 'Compra en Supermercado Nacional',
      type: 'Compra',
      amount: -3450.25,
      balance: 199756.82,
    },
    {
      id: 5,
      date: '04 Feb 2026',
      description: 'Transferencia recibida de María López',
      type: 'Transferencia',
      amount: 2000.00,
      balance: 203207.07,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Movimientos
        </h1>
        <p className="text-gray-600 mt-2">
          Consulta todos tus movimientos y transacciones
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
              Cuenta
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg"
              style={{ borderColor: colors.border }}
            >
              <option>Todas las cuentas</option>
              <option>Primera casa - ***7359</option>
              <option>Fondo de emergencia - ***0569</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
              Desde
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              style={{ borderColor: colors.border }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
              Hasta
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg"
              style={{ borderColor: colors.border }}
            />
          </div>
          <div className="flex items-end">
            <button
              className="w-full px-6 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: colors.primary }}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de transacciones */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: colors.grey100 }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.textPrimary }}>
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.textPrimary }}>
                  Descripción
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold" style={{ color: colors.textPrimary }}>
                  Tipo
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold" style={{ color: colors.textPrimary }}>
                  Monto
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold" style={{ color: colors.textPrimary }}>
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b" style={{ borderColor: colors.border }}>
                  <td className="px-6 py-4 text-sm" style={{ color: colors.textSecondary }}>
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold" style={{ color: colors.textPrimary }}>
                      {transaction.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: colors.grey100,
                        color: colors.textSecondary,
                      }}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 text-right text-sm font-bold"
                    style={{
                      color: transaction.amount > 0 ? colors.success : colors.error
                    }}
                  >
                    {transaction.amount > 0 ? '+' : ''}RD$ {Math.abs(transaction.amount).toLocaleString('es-DO', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold" style={{ color: colors.textPrimary }}>
                    RD$ {transaction.balance.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm" style={{ color: colors.textSecondary }}>
          Mostrando 5 de 25 transacciones
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded-lg font-semibold"
            style={{ borderColor: colors.border, color: colors.textSecondary }}
          >
            Anterior
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: colors.primary }}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
