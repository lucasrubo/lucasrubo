"use client";

import { AppContent } from "./Desktop";

interface MobileAppModalProps {
  appId: string;
  title: string;
  onClose: () => void;
}

export default function MobileAppModal({ appId, title, onClose }: MobileAppModalProps) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-white dark:bg-[#1d1b17]"
      style={{ animation: "mobile-modal-in 0.3s ease forwards" }}
    >
      {/* Mobile title bar */}
      <div className="flex items-center justify-between h-12 px-4 shrink-0 bg-[#f5f5f5] dark:bg-[#2c2a27] border-b border-black/10 dark:border-white/8">
        <button
          onClick={onClose}
          className="text-ph-orange text-sm font-semibold min-w-[48px]"
        >
          ← Voltar
        </button>
        <span className="text-sm font-medium text-black/70 dark:text-white/70 truncate px-2">
          {title}
        </span>
        <div className="min-w-[48px]" />
      </div>

      {/* App content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <AppContent appId={appId} />
      </div>
    </div>
  );
}
