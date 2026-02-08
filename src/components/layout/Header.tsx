"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/features/auth/components/AuthContext";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onNotificationsClick?: () => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNotificationsClick,
  notificationCount = 0,
}) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirigir inmediatamente después del logout
      router.push("/login");
      // Forzar recarga para limpiar estado completo
      router.refresh();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      router.push("/login");
    }
  };

  const handleNotifications = () => {
    if (onNotificationsClick) {
      onNotificationsClick();
    } else {
      router.push("/notificaciones");
    }
  };

  return (
    <header className="bg-[#0095A9] shadow-md">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo/logo-white.png"
              alt="Banco ADEMI"
              width={140}
              height={45}
              priority
              className="object-contain"
            />
          </div>

          {/* Acciones - Notificaciones y Salir */}
          <div className="flex items-center gap-6 mr-10">
            {/* Botón de Notificaciones */}
            <button
              onClick={handleNotifications}
              className="flex flex-col items-center gap-1 group relative hover:opacity-80 transition-opacity"
              aria-label="Notificaciones"
            >
              <div className="relative">
                <Image
                  src="/icon/use-app/bell.svg"
                  alt="Notificaciones"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </div>
              <span className="text-white text-xs font-medium font-[family-name:var(--font-montserrat)]">
                Notificaciones
              </span>
            </button>

            {/* Botón de Salir */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 group hover:opacity-80 transition-opacity"
              aria-label="Salir"
            >
              <div className="relative w-5 h-5">
                <Image
                  src="/icon/use-app/exit.svg"
                  alt="Salir"
                  width={24}
                  height={24}
                  className="w-full h-full group-hover:opacity-0 transition-opacity duration-200"
                />
                <Image
                  src="/icon/use-app/exit.svg"
                  alt="Salir"
                  width={24}
                  height={24}
                  className="absolute top-0 left-0 w-full h-full filter invert-[14%] sepia-[82%] saturate-[4471%] hue-rotate-[349deg] brightness-[101%] contrast-[101%] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>
              <span className="text-white text-xs font-medium font-[family-name:var(--font-montserrat)] group-hover:text-red-500 transition-colors duration-200">
                Salir
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};