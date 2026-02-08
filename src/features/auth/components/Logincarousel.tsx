"use client";

import React from "react";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { useCarousel } from "../hooks/useCarousel";
import { BranchLocatorSlide } from "./carousel/Branchlocatorslide";
import { AppDownloadSlide } from "./carousel/Appdownloadslide";

/**
 * Configuración de slides del carrusel de login
 */
const LOGIN_SLIDES = [
  {
    id: "branch-locator",
    component: BranchLocatorSlide,
  },
  {
    id: "app-download",
    component: AppDownloadSlide,
  },
] as const;

interface LoginCarouselProps {
  autoPlayInterval?: number; // Intervalo en ms (default: 5000)
  showIndicators?: boolean;
  showControls?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Carrusel de Login
 * 
 * Muestra diferentes slides promocionales en la segunda columna del login.
 * Cambia automáticamente cada cierto tiempo y permite navegación manual.
 */
export const LoginCarousel: React.FC<LoginCarouselProps> = ({
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = false,
  pauseOnHover = true,
}) => {
  const {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
  } = useCarousel({
    totalSlides: LOGIN_SLIDES.length,
    autoPlayInterval,
    pauseOnHover,
  });

  return (
    <Carousel
      currentSlide={currentSlide}
      totalSlides={LOGIN_SLIDES.length}
      onNext={nextSlide}
      onPrev={prevSlide}
      onGoToSlide={goToSlide}
      onMouseEnter={pauseOnHover ? pause : undefined}
      onMouseLeave={pauseOnHover ? resume : undefined}
      showIndicators={showIndicators}
      showControls={showControls}
      className="w-full h-full"
    >
      {LOGIN_SLIDES.map((slide) => {
        const SlideComponent = slide.component;
        return (
          <CarouselSlide key={slide.id}>
            <SlideComponent />
          </CarouselSlide>
        );
      })}
    </Carousel>
  );
};