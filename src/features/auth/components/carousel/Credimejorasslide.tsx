"use client";

import React from "react";
import Image from "next/image";

/**
 * Slide de Credimejoras (Imagen Estática)
 * 
 * Muestra la imagen de fondo original de "Credimejoras de Banco ADEMI"
 * como slide alternativo en el carrusel
 */
export const CredimejorasSlide: React.FC = () => {
  return (
    <div className="w-full h-full bg-[--color-primary] relative">
      <Image
        src="/images/background-login.png"
        alt="Credimejoras de Banco ADEMI"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};