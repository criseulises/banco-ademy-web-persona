// app/(authenticated)/layout.tsx
"use client";

import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { ChatAssistant } from "@/components/chat/ChatAssistant";
import Sidebar from "@/components/layout/Sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Full width */}
      <Header notificationCount={3} />

      {/* Main Content Area - Two columns */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        {/* Left Column - Main Content (scrollable) */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">{children}</div>
        </main>

        {/* Right Column - Chat Assistant (fixed width) */}
        <aside className="w-[370px]">
          <ChatAssistant />
        </aside>
      </div>
    </div>
  );
}