'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { colors } from '@/styles/colors';
import { formatRelativeDate } from '@/utils/dateUtils';

interface Notification {
  id: string;
  userId: string;
  type: 'PRESTAMO' | 'ALERTA' | 'EVENTO' | 'PROMOCION' | 'INFORMACION' | 'TRANSACCION' | 'SEGURIDAD' | 'RECORDATORIO' | 'SISTEMA';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'HIGH' | 'NORMAL' | 'LOW';
  icon?: string;
  actionUrl?: string;
  isHighlighted?: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar notificaciones desde el mock data
    fetch('/mock_data/notifications.json')
      .then(res => res.json())
      .then(data => {
        setNotifications(data.notifications);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading notifications:', error);
        setLoading(false);
      });
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    // Marcar como leída
    if (!notification.isRead) {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }

    // Navegar si tiene actionUrl
    if (notification.actionUrl) {
      // En producción, usar router.push(notification.actionUrl)
      console.log('Navigate to:', notification.actionUrl);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando notificaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            Notificaciones
          </h1>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Image
                src="/icon/tabler/tabler-icon-bell.svg"
                alt="Sin notificaciones"
                width={64}
                height={64}
                className="mx-auto mb-4 opacity-30"
              />
              <h3 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>
                No tienes notificaciones
              </h3>
              <p style={{ color: colors.textSecondary }}>
                Cuando recibas notificaciones, aparecerán aquí
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="bg-white rounded-xl p-5 cursor-pointer transition-all relative"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base font-bold leading-tight mb-2"
                      style={{ color: colors.textPrimary }}
                    >
                      {notification.title}
                    </h3>

                    {/* Timestamp */}
                    <div className="flex items-center gap-2">
                      <Image
                        src="/icon/tabler/tabler-icon-calendar-time.svg"
                        alt="Fecha"
                        width={16}
                        height={16}
                        style={{
                          filter: 'brightness(0) saturate(0%) brightness(50%)',
                        }}
                      />
                      <span className="text-sm" style={{ color: colors.grey500 }}>
                        {formatRelativeDate(notification.date)}
                      </span>
                    </div>
                  </div>

                  {/* Unread Indicator */}
                  {!notification.isRead && (
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: '#FA6C26' }}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
