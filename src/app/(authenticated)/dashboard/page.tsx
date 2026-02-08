"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/features/auth/services/authService";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación
    if (!AuthService.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = async () => {
    await AuthService.logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-text">
              Dashboard - Banco ADEMI
            </h1>
            <button
              onClick={handleLogout}
              className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Mis Cuentas
              </h3>
              <p className="text-text/70">
                Consulta tus cuentas y saldos disponibles
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Transferencias
              </h3>
              <p className="text-text/70">
                Realiza transferencias de manera segura
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-2">
                Préstamos
              </h3>
              <p className="text-text/70">
                Consulta tus préstamos activos
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              <strong>Nota:</strong> Esta es una página de ejemplo. En producción, 
              aquí se mostrarían los datos reales del usuario y las funcionalidades 
              del sistema bancario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}