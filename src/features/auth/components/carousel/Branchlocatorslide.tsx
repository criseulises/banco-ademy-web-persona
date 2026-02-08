"use client";

import Image from "next/image";
import React from "react";

/**
 * Slide de Localizador de Sucursales
 * 
 * Muestra un mapa ilustrativo con pines de ubicación
 * y un call-to-action para conocer las sucursales
 */
export const BranchLocatorSlide: React.FC = () => {
  const handleDiscoverBranches = () => {
    // Aquí puedes agregar la lógica para redirigir o abrir modal
    console.log("Descubrir sucursales");
    // window.open('/sucursales', '_blank');
  };

  return (
    <div className="w-full h-full bg-[#B8E6ED] flex flex-col items-center justify-center p-12 relative overflow-hidden">
      {/* Contenido Principal */}
      <div className="relative z-10 flex flex-col items-center max-w-xl space-y-12">
        {/* Título */}
        <div className="bg-[#0095A9] text-white px-12 py-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center leading-relaxed">
            DESCUBRE NUESTRAS
            <br />
            SUCURSALES CERCA DE TI
          </h2>
        </div>

        {/* Ilustración de Mapa con Pines */}
        <div className="relative w-full max-w-md h-64">
          {/* Mapa base simplificado */}
          <div className="w-full h-full">
            {/* Contorno del mapa */}
            <Image
              src="/images/dominican-republic.png"
              alt="Descarga Ademi Online APP"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Pines de Ubicación */}
          <div className="absolute -top-1 left-1/4 animate-bounce">
            <LocationPin icon="building" delay={0} />
          </div>

          <div className="absolute bottom-1/3 right-1/2 top-10 animate-bounce" style={{ animationDelay: '0.4s' }}>
            <LocationPin icon="building" delay={400} />
          </div>

          <div className="absolute top-7 right-1/4 animate-bounce" style={{ animationDelay: '0.2s' }}>
            <LocationPin icon="atm" delay={200} />
          </div>

        </div>

        {/* Call to Action */}
        <button
          onClick={handleDiscoverBranches}
          className="bg-[#FA6C26] hover:bg-[#e56122] text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Conócelas aquí
        </button>
      </div>
    </div>
  );
};

/**
 * Componente de Pin de Ubicación
 */
interface LocationPinProps {
  icon: "building" | "atm";
  delay?: number;
}

const LocationPin: React.FC<LocationPinProps> = ({ icon }) => {
  return (
    <div className="relative">
      {/* Pin Container */}
      <div className="relative bg-[#0095A9] rounded-full p-4 shadow-xl">
        {/* Icono */}
        <div className="bg-white rounded-full p-3">
          {icon === "building" ? (
            <svg className="w-8 h-8 text-[#0095A9]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L2 9v12h20V9l-10-6zM11 19H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V9h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[#0095A9]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
            </svg>
          )}
        </div>
      </div>

      {/* Pin Point */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-[#0095A9]" />
      </div>
    </div>
  );
};