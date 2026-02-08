import React from 'react';
import { colors } from '@/styles/colors';

export default function Configuracion() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
          Configuración
        </h1>
        <p className="text-gray-600 mt-2">
          Personaliza tu experiencia y administra tu cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menú Lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <nav className="p-2">
              {[
                { icon: '👤', label: 'Perfil', active: true },
                { icon: '🔒', label: 'Seguridad', active: false },
                { icon: '🔔', label: 'Notificaciones', active: false },
                { icon: '🌐', label: 'Idioma y Región', active: false },
                { icon: '🎨', label: 'Apariencia', active: false },
                { icon: '📱', label: 'Dispositivos', active: false },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors"
                  style={{
                    backgroundColor: item.active ? colors.primary + '10' : 'transparent',
                    color: item.active ? colors.primary : colors.textSecondary,
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.textPrimary }}>
              Perfil
            </h2>

            <div className="space-y-6">
              {/* Foto de Perfil */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ backgroundColor: colors.primary + '20' }}>
                  👤
                </div>
                <div>
                  <button
                    className="px-4 py-2 rounded-lg font-semibold mr-2"
                    style={{ backgroundColor: colors.primary, color: 'white' }}
                  >
                    Cambiar Foto
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg font-semibold border"
                    style={{ borderColor: colors.border, color: colors.textSecondary }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="border-t pt-6" style={{ borderColor: colors.border }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                      Nombre
                    </label>
                    <input
                      type="text"
                      defaultValue="Cristian"
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                      Apellido
                    </label>
                    <input
                      type="text"
                      defaultValue="Sánchez"
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="cristian.sanchez@email.com"
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (809) 555-1234"
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: colors.border }}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>
                      Dirección
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Av. Winston Churchill #1100, Santo Domingo, D.N."
                      className="w-full px-4 py-2 border rounded-lg"
                      style={{ borderColor: colors.border }}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    className="px-6 py-2 rounded-lg font-semibold border"
                    style={{ borderColor: colors.border, color: colors.textSecondary }}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-6 py-2 rounded-lg font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Zona de Peligro */}
          <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border-2 border-red-200">
            <h3 className="text-lg font-bold mb-2" style={{ color: colors.error }}>
              Zona de Peligro
            </h3>
            <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
              Las siguientes acciones son irreversibles. Por favor, ten cuidado.
            </p>
            <button
              className="px-6 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: colors.error }}
            >
              Cerrar Cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
