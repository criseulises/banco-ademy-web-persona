// components/auth/LogoutButton.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/components/AuthContext";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  className?: string;
  showText?: boolean;
}

export default function LogoutButton({ 
  variant = "ghost", 
  size = "default",
  className = "",
  showText = true
}: LogoutButtonProps) {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
      // Forzar recarga si falla
      window.location.href = "/login";
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      disabled={isLoading}
      className={cn("transition-all duration-200", className)}
    >
      {isLoading ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          {showText && <span className="ml-2">Cerrando...</span>}
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
          {showText && <span className="ml-2">Cerrar Sesión</span>}
        </>
      )}
    </Button>
  );
}