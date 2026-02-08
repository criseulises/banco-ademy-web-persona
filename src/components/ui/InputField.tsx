"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/cn";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200",
              icon && "pl-10",
              error
                ? "border-red-500 focus:ring-red-500 focus:border-transparent"
                : "border-gray-300 focus:ring-primary focus:border-transparent",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";