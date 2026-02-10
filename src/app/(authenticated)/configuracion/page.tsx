'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

interface SettingOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  enabled: boolean;
}

export default function Configuracion() {
  const [settingsOptions, setSettingsOptions] = useState<SettingOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mock_data/settings.json')
      .then(res => res.json())
      .then(data => {
        setSettingsOptions(data.settingsOptions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading settings:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando configuraciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6" style={{ color: colors.textPrimary }}>
          Configuraciones
        </h1>

        {/* Grid de opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {settingsOptions.map((option) => (
            <button
              key={option.id}
              className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-200 text-left group"
              onClick={() => {
                // Aquí puedes agregar la navegación o acción correspondiente
                if (option.id === 'rate_app') {
                  // Abrir modal de calificación o redireccionar a la tienda
                  console.log('Calificar app');
                } else {
                  // Navegar a la ruta correspondiente
                  window.location.href = option.route;
                }
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Image
                    src={`/icon/tabler/${option.icon}`}
                    alt={option.name}
                    width={24}
                    height={24}
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                    {option.name}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
