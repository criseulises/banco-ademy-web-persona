//src/app/(guest)/layout.tsx
"use client";

import { ReactNode } from "react";

interface GuestLayoutProps {
  children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return <>{children}</>;
}