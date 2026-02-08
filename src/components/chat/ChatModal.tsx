'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { ChatAssistant } from './ChatAssistant';
import { colors } from '@/styles/colors';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-label="Cerrar chat"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-md h-[600px] pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-10 group"
            aria-label="Cerrar"
          >
            <div className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300">
              <Image
                src="/icon/use-app/close.svg"
                alt="Cerrar"
                width={20}
                height={20}
                style={{
                  filter: 'brightness(0) saturate(100%) invert(38%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(95%) contrast(88%)'
                }}
              />
            </div>
          </button>

          {/* Chat Assistant */}
          <div className="h-full">
            <ChatAssistant />
          </div>
        </div>
      </div>
    </>
  );
};
