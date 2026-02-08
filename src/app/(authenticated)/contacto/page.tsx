import React from 'react';
import { colors } from '@/styles/colors';

export default function Contacto() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Contacto
        </h1>
        <p className="text-gray-600 mt-2">
          ¿Necesitas ayuda? Estamos aquí para ti
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Canales de Contacto */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            Canales de Atención
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.grey50 }}>
              <div className="text-2xl">📞</div>
              <div>
                <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                  Teléfono
                </h3>
                <p style={{ color: colors.textSecondary }}>809-555-ADEMI (23364)</p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Lun-Vie: 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.grey50 }}>
              <div className="text-2xl">✉️</div>
              <div>
                <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                  Email
                </h3>
                <p style={{ color: colors.textSecondary }}>atencion@bancoademi.com</p>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Respuesta en 24 horas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: colors.grey50 }}>
              <div className="text-2xl">💬</div>
              <div>
                <h3 className="font-bold" style={{ color: colors.textPrimary }}>
                  Chat en línea
                </h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Disponible 24/7
                </p>
                <button
                  className="mt-2 px-4 py-2 rounded-lg text-white font-semibold text-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  Iniciar Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            Envíanos un Mensaje
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                Asunto
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: colors.border }}
              >
                <option>Selecciona un asunto</option>
                <option>Consulta General</option>
                <option>Problema Técnico</option>
                <option>Reclamo</option>
                <option>Sugerencia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                Mensaje
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: colors.border }}
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg text-white font-bold"
              style={{ backgroundColor: colors.primary }}
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>

      {/* Sucursales */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Nuestras Sucursales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
            <h3 className="font-bold mb-2" style={{ color: colors.textPrimary }}>
              Sucursal Principal
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Av. Winston Churchill #1100<br />
              Santo Domingo, D.N.<br />
              Tel: 809-555-0001
            </p>
          </div>
          <div className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
            <h3 className="font-bold mb-2" style={{ color: colors.textPrimary }}>
              Sucursal Santiago
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Av. 27 de Febrero #250<br />
              Santiago de los Caballeros<br />
              Tel: 809-555-0002
            </p>
          </div>
          <div className="p-4 border rounded-lg" style={{ borderColor: colors.border }}>
            <h3 className="font-bold mb-2" style={{ color: colors.textPrimary }}>
              Sucursal La Romana
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Calle Duarte #45<br />
              La Romana<br />
              Tel: 809-555-0003
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
