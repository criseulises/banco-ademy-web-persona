"use client";

import { useState } from "react";
import type React from "react";

import { Mail, ArrowLeft, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import TextLink from "@/components/shared/TextLink";
import InputError from "@/components/shared/InputError";






export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {





    } catch {
      setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="font-montserrat relative min-h-screen overflow-hidden bg-[#F5F6FB]">
        <div className="relative flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            {successMessage && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-4 shadow-lg animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                    <Shield className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium text-emerald-800">{successMessage}</p>
                </div>
              </div>
            )}

            <div className="relative">
              {/* Fondo decorativo con color primario */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0095A9]/10 to-[#0095A9]/5 rounded-3xl blur-xl" />
              
              <div className="relative rounded-3xl bg-white p-8 shadow-lg border border-gray-200">
                {/* Logo y encabezado */}
                <div className="mb-8 text-center">
                  {/* Icono con color secundario */}
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0095A9] to-[#0095A9]/90 text-white shadow-md">
                    <Mail className="h-9 w-9" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-[#0C0A18] mb-3">
                    ¿Olvidaste tu contraseña?
                  </h1>
                  
                  <p className="text-[#0C0A18]/70 leading-relaxed text-sm">
                    No te preocupes, te enviaremos instrucciones para restablecer tu contraseña de forma segura
                  </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                  <div className="space-y-2">
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-semibold text-[#0C0A18]"
                    >
                      Correo electrónico
                    </label>
                    
                    <div className="relative group">
                      <Mail
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0C0A18]/50 group-focus-within:text-[#0095A9] transition-colors duration-200"
                        size={18}
                      />
                      
                      <Input
                        id="email"
                        type="email"
                        autoComplete="off"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="correo@ejemplo.com"
                        className="pl-12 h-12 rounded-xl border-[#0C0A18]/20 focus:border-[#0095A9] focus:ring-[#0095A9]/20 transition-all duration-200 text-[#0C0A18]"
                        aria-invalid={!!error}
                        required
                      />
                    </div>
                    
                    <InputError message={error ?? undefined} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0095A9] to-[#0095A9]/90 hover:from-[#0095A9] hover:to-[#0095A9] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      "Enviar enlace de restablecimiento"
                    )}
                  </Button>
                </form>

                {/* Enlace de regreso */}
                <div className="mt-8 text-center">
                  <TextLink
                    href="/login"
                    className="inline-flex items-center gap-2 text-[#0C0A18]/70 hover:text-[#FA6C26] font-medium transition-colors duration-200 group"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Volver al inicio de sesión
                  </TextLink>
                </div>

                {/* Nota informativa */}
                <div className="mt-6 p-4 bg-[#F5F6FB] rounded-lg border border-[#0C0A18]/10">
                  <p className="text-xs text-[#0C0A18]/60 text-center">
                    <strong>Importante:</strong> Solo recibirás el correo si la dirección está registrada en nuestro sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}