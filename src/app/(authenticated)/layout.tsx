// app/(authenticated)/layout.tsx
"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/layout/Header";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { ChatModal } from "@/components/chat/ChatModal";
import Sidebar from "@/components/layout/Sidebar";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Full width */}
      <Header notificationCount={3} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        {/* Main Content (scrollable) */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">{children}</div>
        </main>
      </div>

      {/* Floating Chat Button */}
      <FloatingChatButton
        onClick={() => setIsChatOpen(true)}
        hasUnreadMessages={false}
      />

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}