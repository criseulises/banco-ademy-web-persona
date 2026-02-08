//src/app/(authenticated)/layout.tsx
"use client";

import { ReactNode } from "react";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return <>{children}</>;
}