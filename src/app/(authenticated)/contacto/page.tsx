'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

interface AccountExecutive {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  avatar: string;
}

interface SocialNetwork {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
}

export default function Contacto() {
  const [accountExecutive, setAccountExecutive] = useState<AccountExecutive | null>(null);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mock_data/contact.json')
      .then(res => res.json())
      .then(data => {
        setAccountExecutive(data.accountExecutive);
        setSocialNetworks(data.socialNetworks);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading contact data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando información de contacto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Ejecutivo de cuentas */}
        {accountExecutive && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Ejecutivo de cuentas
            </h2>
            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow w-[400px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Image
                      src="/icon/tabler/tabler-icon-user.svg"
                      alt="Usuario"
                      width={24}
                      height={24}
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                      {accountExecutive.name}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {accountExecutive.email}
                    </p>
                  </div>
                </div>
                <button
                  className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-opacity-20 transition-all"
                  style={{ backgroundColor: colors.primary + '15' }}
                  onClick={() => window.location.href = `tel:${accountExecutive.phone}`}
                >
                  <Image
                    src="/icon/tabler/tabler-icon-phone.svg"
                    alt="Teléfono"
                    width={24}
                    height={24}
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Redes sociales */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            Redes sociales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialNetworks.map((network) => (
              <a
                key={network.id}
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Image
                      src={`/icon/tabler/${network.icon}`}
                      alt={network.name}
                      width={20}
                      height={20}
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                      }}
                    />
                  </div>
                  <span className="text-base font-semibold" style={{ color: colors.textPrimary }}>
                    {network.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
