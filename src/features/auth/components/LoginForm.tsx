"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { User, Lock } from "lucide-react";
import { loginSchema, LoginFormData } from "../schema/loginSchema";
import { useLogin } from "../hooks/useLogin";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/shared/Button";

export const LoginForm = () => {
  const { isLoading, error, handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    await handleLogin(data);
  };

  return (
    <div className="w-full max-w-md space-y-8 px-8">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <Image
          src="/logo/ademi.png"
          alt="Banco ADEMI"
          width={180}
          height={60}
          priority
          className="object-contain"
        />
      </div>

      {/* Título y subtítulo */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-text">
          ¡Bienvenido de vuelta!
        </h1>
        <p className="text-gray-600 text-sm">
          Ingresa tus credenciales para iniciar sesión
        </p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Error general */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error.message}
          </div>
        )}

        {/* Campo de usuario */}
        <InputField
          {...register("username")}
          type="text"
          placeholder="Ingrese su usuario"
          error={errors.username?.message}
          icon={<User size={20} />}
          autoComplete="username"
        />

        {/* Campo de contraseña */}
        <InputField
          {...register("password")}
          type="password"
          placeholder="Ingrese su contraseña"
          error={errors.password?.message}
          icon={<Lock size={20} />}
          autoComplete="current-password"
        />

        {/* Enlace olvidaste tu contraseña */}
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="link-secondary text-sm"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón de inicio de sesión */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
        >
          Iniciar sesión
        </Button>
      </form>
    </div>
  );
};