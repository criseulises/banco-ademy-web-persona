"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseCarouselProps {
  totalSlides: number;
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

interface UseCarouselReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
}

/**
 * Hook personalizado para manejar la lógica del carrusel
 * 
 * @param totalSlides - Número total de slides
 * @param autoPlayInterval - Intervalo de auto-play en ms (default: 5000)
 * @param pauseOnHover - Si debe pausar al hacer hover (default: true)
 * @returns Objeto con estado y funciones del carrusel
 */
export const useCarousel = ({
  totalSlides,
  autoPlayInterval = 5000,
  pauseOnHover = true,
}: UseCarouselProps): UseCarouselReturn => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Navega al siguiente slide
   */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  /**
   * Navega al slide anterior
   */
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  /**
   * Navega a un slide específico
   */
  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  /**
   * Pausa el auto-play
   */
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  /**
   * Resume el auto-play
   */
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  /**
   * Efecto para manejar el auto-play
   */
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides, isPaused, autoPlayInterval, nextSlide]);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    isPaused,
    pause,
    resume,
  };
};