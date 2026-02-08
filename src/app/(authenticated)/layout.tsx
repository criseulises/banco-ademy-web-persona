// app/(authenticated)/layout.tsx
"use client";

import { ReactNode, useState, useEffect } from "react";
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
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Cargar el conteo de notificaciones no leídas
    fetch('/mock_data/notifications.json')
      .then(res => res.json())
      .then(data => {
        const unreadCount = data.notifications.filter((n: any) => !n.isRead).length;
        setNotificationCount(unreadCount);
      })
      .catch(error => {
        console.error('Error loading notification count:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Full width */}
      <Header notificationCount={notificationCount} />

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