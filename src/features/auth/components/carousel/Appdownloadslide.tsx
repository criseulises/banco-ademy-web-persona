"use client";

import React from "react";
import Image from "next/image";

/**
 * Slide de Descarga de App
 * 
 * Muestra la imagen promocional de la aplicación móvil
 * con las opciones de descarga para iOS y Android
 */
export const AppDownloadSlide: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        <Image
          src="/images/ademi-manos.jpeg"
          alt="Descarga Ademi Online APP"
          fill
        />
      </div>
    </div>
  );
};