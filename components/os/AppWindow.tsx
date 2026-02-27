"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import {
  X, Minus, Maximize2,
  Undo2, Redo2, ChevronDown,
  Bold, Italic, Underline,
  AlignLeft, AlignCenter, AlignRight,
  Link, MessageSquare, Search, Settings,
} from "lucide-react";
import { useWindows } from "@/contexts/WindowContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppWindowProps {
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isActive: boolean;
  children: React.ReactNode;
}

export default function AppWindow({
  appId,
  title,
  position,
  size,
  isMinimized,
  isMaximized,
  zIndex,
  isActive,
  children,
}: AppWindowProps) {
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, updatePosition, openWindow } =
    useWindows();
  const { t } = useLanguage();
  const isDragging = useRef(false);

  const handleTitleBarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      isDragging.current = true;
      const startX = e.clientX - position.x;
      const startY = e.clientY - position.y;

      const onMove = (ev: MouseEvent) => {
        if (!isDragging.current) return;
        updatePosition(appId, {
          x: Math.max(0, ev.clientX - startX),
          y: Math.max(0, ev.clientY - startY),
        });
      };
      const onUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [appId, isMaximized, position, updatePosition]
  );

  // Spring opening animation
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (isMinimized) return null;

  const baseStyle: React.CSSProperties = isMaximized
    ? { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", borderRadius: 0 }
    : { position: "absolute", top: position.y, left: position.x, width: size.width, height: size.height };

  const windowStyle: React.CSSProperties = {
    ...baseStyle,
    zIndex,
    transformOrigin: "center center",
    transform: ready ? "scale(1)" : "scale(0.88)",
    opacity: ready ? 1 : 0,
    transition: ready
      ? "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.16s ease"
      : "none",
  };

  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden ${
        isActive
          ? "shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          : "shadow-[0_8px_28px_rgba(0,0,0,0.30)]"
      }`}
      style={windowStyle}
      onMouseDown={() => focusWindow(appId)}
    >
      {/* ── Row 1: Title bar ── */}
      <div
        className={`flex items-center h-8 px-3 shrink-0 border-b relative ${
          isActive
            ? "bg-[#ddd] dark:bg-[#2c2a27] border-black/12 dark:border-white/8"
            : "bg-[#ebebeb] dark:bg-[#232120] border-black/7 dark:border-white/5"
        }`}
        onMouseDown={handleTitleBarMouseDown}
        style={{ cursor: isMaximized ? "default" : "grab" }}
      >
        {/* Window controls — squircle style with brand colors */}
        <div className="flex items-center gap-1.5 shrink-0 z-10">
          {/* Close — ph-orange */}
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(appId); }}
            title="Close"
            className="w-3.5 h-3.5 rounded bg-ph-orange flex items-center justify-center
                       hover:brightness-125 hover:scale-110 active:scale-95
                       transition-all duration-100 shadow-sm"
          >
            <X size={8} strokeWidth={2.5} className="text-white" />
          </button>

          {/* Minimize — amber */}
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(appId); }}
            title="Minimize"
            className="w-3.5 h-3.5 rounded bg-amber-400 flex items-center justify-center
                       hover:brightness-125 hover:scale-110 active:scale-95
                       transition-all duration-100 shadow-sm"
          >
            <Minus size={8} strokeWidth={2.5} className="text-white" />
          </button>

          {/* Maximize — ph-blue */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(appId); }}
            title="Maximize"
            className="w-3.5 h-3.5 rounded bg-ph-blue flex items-center justify-center
                       hover:brightness-125 hover:scale-110 active:scale-95
                       transition-all duration-100 shadow-sm"
          >
            <Maximize2 size={7} strokeWidth={2.5} className="text-white" />
          </button>
        </div>

        {/* Title + chevron, centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none">
          <span className={`text-[12px] font-medium ${
            isActive ? "text-black/60 dark:text-white/55" : "text-black/40 dark:text-white/35"
          }`}>{title}</span>
          <ChevronDown size={11} className={isActive ? "text-black/40 dark:text-white/35" : "text-black/25 dark:text-white/20"} />
        </div>
      </div>

      {/* ── Row 2: Toolbar ── */}
      <div className={`flex items-center h-9 px-2 gap-0.5 shrink-0 border-b ${
        isActive
          ? "bg-[#f5f5f5] dark:bg-[#222018] border-black/8 dark:border-white/6"
          : "bg-[#f9f9f9] dark:bg-[#1c1a17] border-black/5 dark:border-white/4"
      }`}>
        {/* Undo / Redo */}
        <ToolBtn icon={Undo2} label="Undo" />
        <ToolBtn icon={Redo2} label="Redo" />

        <Divider />

        {/* Zoom */}
        <button className="flex items-center gap-1 px-2 py-1 text-[11px] text-gray-500 dark:text-white/40
                           hover:bg-black/5 dark:hover:bg-white/6 hover:text-gray-700 dark:hover:text-white/65
                           rounded transition-colors">
          Zoom <ChevronDown size={10} />
        </button>

        <Divider />

        {/* Text formatting */}
        <ToolBtn icon={Bold}      label="Bold" />
        <ToolBtn icon={Italic}    label="Italic" />
        <ToolBtn icon={Underline} label="Underline" />

        <Divider />

        {/* Alignment */}
        <ToolBtn icon={AlignLeft}   label="Align left" />
        <ToolBtn icon={AlignCenter} label="Center" />
        <ToolBtn icon={AlignRight}  label="Align right" />

        <Divider />

        {/* Link / comment */}
        <ToolBtn icon={Link}          label="Add link" />
        <ToolBtn icon={MessageSquare} label="Comment" />

        <Divider />

        {/* Search / settings */}
        <ToolBtn icon={Search}   label="Search" />
        <ToolBtn icon={Settings} label="Settings" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA inside toolbar */}
        <button
          onClick={() => openWindow("signup", { title: "Sign up – PostHog", size: { width: 480, height: 520 } })}
          className="text-[11.5px] font-semibold bg-ph-orange text-white px-3 py-1 rounded
                     hover:bg-[#d94400] transition-colors shrink-0"
        >
          {t.appWindow.getStarted}
        </button>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-[#1d1b17]">
        {children}
      </div>
    </div>
  );
}

function ToolBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      aria-label={label}
      className="p-1.5 text-gray-400 dark:text-white/30
                 hover:text-gray-700 dark:hover:text-white/65
                 hover:bg-black/6 dark:hover:bg-white/6
                 rounded transition-colors"
    >
      <Icon size={13} />
    </button>
  );
}

function Divider() {
  return <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1 shrink-0" />;
}
