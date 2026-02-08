import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginCarousel } from "../components/Logincarousel";

export default function LoginContainer() {
  return (
    <div className="min-h-screen flex">
      {/* Columna izquierda - Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <LoginForm />
      </div>

      {/* Columna derecha - Carrusel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[--color-primary]">
        <LoginCarousel
          autoPlayInterval={5000}
          showIndicators={true}
          showControls={false}
          pauseOnHover={true}
        />
      </div>
    </div>
  );
}