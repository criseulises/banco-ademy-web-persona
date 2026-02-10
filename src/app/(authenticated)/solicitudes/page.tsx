'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';

interface Request {
  id: string;
  userId: string;
  type: string;
  productType: string;
  status: string;
  requestDate: string;
  lastUpdate: string;
  description: string;
  amount?: number;
  notes: string;
}

interface RequestType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  enabled: boolean;
}

export default function Solicitudes() {
  const [myRequests, setMyRequests] = useState<Request[]>([]);
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/mock_data/requests.json')
      .then(res => res.json())
      .then(data => {
        // Filtrar solo solicitudes pendientes para "Mis solicitudes"
        const pendingRequests = data.requests.filter((req: Request) => req.status === 'Pendiente');
        setMyRequests(pendingRequests);
        setRequestTypes(data.requestTypes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading requests:', error);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente':
        return colors.warning;
      case 'Aprobado':
        return colors.success;
      case 'Completado':
        return colors.info;
      case 'Rechazado':
        return colors.error;
      default:
        return colors.grey500;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Mis solicitudes */}
        {myRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
              Mis solicitudes
            </h2>
            <div className="space-y-3">
              {myRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + '15' }}
                      >
                        <Image
                          src="/icon/tabler/tabler-icon-credit-card.svg"
                          alt={request.type}
                          width={24}
                          height={24}
                          style={{
                            filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                          {request.type}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: colors.warning + '15' }}>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.warning }}></div>
                      <span className="text-sm font-semibold" style={{ color: colors.warning }}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solicitar */}
        <div>
          <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
            Solicitar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requestTypes.map((requestType) => (
              <button
                key={requestType.id}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-200"
                    style={{ backgroundColor: colors.primary + '15' }}
                  >
                    <Image
                      src={`/icon/tabler/${requestType.icon}`}
                      alt={requestType.name}
                      width={24}
                      height={24}
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(47%) sepia(65%) saturate(1195%) hue-rotate(152deg) brightness(91%) contrast(101%)'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>
                      {requestType.name}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
