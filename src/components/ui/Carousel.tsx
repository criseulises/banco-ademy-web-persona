"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface CarouselProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToSlide: (index: number) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showIndicators?: boolean;
  showControls?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente Carousel reutilizable
 * 
 * Proporciona la estructura visual y controles del carrusel,
 * mientras delega la lógica al hook useCarousel
 */
export const Carousel: React.FC<CarouselProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoToSlide,
  onMouseEnter,
  onMouseLeave,
  showIndicators = true,
  showControls = false,
  children,
  className,
}) => {
  return (
    <div
      className={cn("relative w-full h-full overflow-hidden", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {children}
      </div>

      {/* Controles de Navegación (Flechas) */}
      {showControls && totalSlides > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[--color-primary] p-2 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[--color-primary] p-2 rounded-full shadow-lg transition-all duration-200 z-10"
            aria-label="Siguiente slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicadores de Posición */}
      {showIndicators && totalSlides > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-black w-8"
                  : "bg-black/50 hover:bg-black/75"
              )}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Componente individual de slide
 */
interface CarouselSlideProps {
  children: React.ReactNode;
  className?: string;
}

export const CarouselSlide: React.FC<CarouselSlideProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 w-full h-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};