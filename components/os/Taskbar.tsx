"use client";

import { X } from "lucide-react";
import { useWindows } from "@/contexts/WindowContext";

const APP_ICONS: Record<string, string> = {
  about:      "👤",
  projects:   "📁",
  skills:     "⚡",
  experience: "💼",
  contact:    "✉️",
  roteirum:   "🎬",
  erp:        "🏢",
  larissa:    "🎨",
  home:       "🦔",
  pricing:    "💰",
  signup:     "🚀",
  demo:       "▶️",
};

export default function Taskbar() {
  const { windows, activeAppId, focusWindow, closeWindow } = useWindows();

  if (windows.length === 0) return <div className="h-10 bg-[#111009] border-t border-white/5 shrink-0" />;

  return (
    <div className="h-10 bg-[#111009]/95 backdrop-blur-sm flex items-center px-3 gap-1 shrink-0 border-t border-white/8 overflow-x-auto">
      {windows.map((win) => {
        const isActive = win.appId === activeAppId && !win.isMinimized;
        const emoji = APP_ICONS[win.appId] ?? "🗂";

        return (
          // Outer is a div (not button) to avoid <button> nesting with the close button
          <div
            key={win.appId}
            role="button"
            tabIndex={0}
            onClick={() => focusWindow(win.appId)}
            onKeyDown={(e) => e.key === "Enter" && focusWindow(win.appId)}
            className={`
              group flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-md text-[12px]
              transition-all duration-150 max-w-45 shrink-0 cursor-default select-none
              ${isActive
                ? "bg-white/18 text-white"
                : win.isMinimized
                  ? "bg-white/5 text-white/35 hover:bg-white/10 hover:text-white/60"
                  : "text-white/55 hover:bg-white/10 hover:text-white/80"
              }
            `}
          >
            {/* Status dot */}
            {win.isMinimized ? (
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/70 shrink-0" />
            ) : isActive ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
            ) : null}

            {/* Emoji icon */}
            <span className="text-[13px] leading-none">{emoji}</span>

            {/* Title */}
            <span className="truncate max-w-30 leading-none">{win.title}</span>

            {/* Close button — a real <button> now that it's not nested inside another <button> */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.appId);
              }}
              className="opacity-0 group-hover:opacity-100 hover:bg-white/20 rounded p-0.5 transition-all ml-0.5 shrink-0"
              aria-label={`Close ${win.title}`}
            >
              <X size={9} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
