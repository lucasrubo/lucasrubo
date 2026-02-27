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
import { useAprix } from "@/contexts/AprixContext";

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

const MIN_W = 320;
const MIN_H = 200;

// Resize handles — dir encodes which edges to move
const RESIZE_HANDLES = [
  { dir: "n",  style: "absolute top-0    left-2    right-2   h-1.5 cursor-n-resize"  },
  { dir: "s",  style: "absolute bottom-0 left-2    right-2   h-1.5 cursor-s-resize"  },
  { dir: "e",  style: "absolute top-2    right-0   bottom-2  w-1.5 cursor-e-resize"  },
  { dir: "w",  style: "absolute top-2    left-0    bottom-2  w-1.5 cursor-w-resize"  },
  { dir: "nw", style: "absolute top-0    left-0    w-3       h-3   cursor-nw-resize" },
  { dir: "ne", style: "absolute top-0    right-0   w-3       h-3   cursor-ne-resize" },
  { dir: "sw", style: "absolute bottom-0 left-0    w-3       h-3   cursor-sw-resize" },
  { dir: "se", style: "absolute bottom-0 right-0   w-3       h-3   cursor-se-resize" },
] as const;

export default function AppWindow({
  appId, title, position, size,
  isMinimized, isMaximized, zIndex, isActive, children,
}: AppWindowProps) {
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, updatePosition, updateSize } =
    useWindows();
  const { t } = useLanguage();
  const { toggleChat } = useAprix();
  const isDragging = useRef(false);

  // ── Drag (title bar) ─────────────────────────────────────────────────────
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

  // ── Resize ────────────────────────────────────────────────────────────────
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, dir: string) => {
      if (isMaximized) return;
      e.preventDefault();
      e.stopPropagation();
      focusWindow(appId);

      const startX  = e.clientX;
      const startY  = e.clientY;
      const startW  = size.width;
      const startH  = size.height;
      const startPX = position.x;
      const startPY = position.y;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        let newW = startW, newH = startH, newX = startPX, newY = startPY;

        if (dir.includes("e")) newW = Math.max(MIN_W, startW + dx);
        if (dir.includes("s")) newH = Math.max(MIN_H, startH + dy);
        if (dir.includes("w")) { newW = Math.max(MIN_W, startW - dx); newX = startPX + (startW - newW); }
        if (dir.includes("n")) { newH = Math.max(MIN_H, startH - dy); newY = startPY + (startH - newH); }

        updateSize(appId, { width: newW, height: newH }, { x: newX, y: newY });
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [appId, isMaximized, position, size, focusWindow, updateSize]
  );

  // ── Opening animation ─────────────────────────────────────────────────────
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (isMinimized) return null;

  // Outer div carries only positioning (no overflow-hidden, for resize handles)
  const outerStyle: React.CSSProperties = isMaximized
    ? { position: "absolute", inset: 0, zIndex,
        transform: ready ? "scale(1)" : "scale(0.88)",
        opacity: ready ? 1 : 0,
        transition: ready ? "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.16s ease" : "none",
      }
    : { position: "absolute", top: position.y, left: position.x,
        width: size.width, height: size.height, zIndex,
        transform: ready ? "scale(1)" : "scale(0.88)",
        opacity: ready ? 1 : 0,
        transition: ready ? "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.16s ease" : "none",
      };

  return (
    <div
      style={outerStyle}
      onMouseDown={() => focusWindow(appId)}
    >
      {/* ── Resize handles (hidden when maximized) ─── */}
      {!isMaximized && RESIZE_HANDLES.map(({ dir, style }) => (
        <div
          key={dir}
          className={style}
          onMouseDown={(e) => handleResizeStart(e, dir)}
        />
      ))}

      {/* ── Visual window (fills outer, has rounded corners + overflow-hidden) ── */}
      <div
        className={`absolute inset-0 flex flex-col ${isMaximized ? "" : "rounded-xl"} overflow-hidden ${
          isActive
            ? "shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "shadow-[0_8px_28px_rgba(0,0,0,0.30)]"
        }`}
      >
        {/* Row 1: Title bar */}
        <div
          className={`flex items-center h-8 px-3 shrink-0 border-b relative ${
            isActive
              ? "bg-[#ddd] dark:bg-[#2c2a27] border-black/12 dark:border-white/8"
              : "bg-[#ebebeb] dark:bg-[#232120] border-black/7 dark:border-white/5"
          }`}
          onMouseDown={handleTitleBarMouseDown}
          style={{ cursor: isMaximized ? "default" : "grab" }}
        >
          {/* Window controls */}
          <div className="flex items-center gap-1.5 shrink-0 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(appId); }}
              title="Close"
              className="w-3.5 h-3.5 rounded bg-ph-orange flex items-center justify-center
                         hover:brightness-125 hover:scale-110 active:scale-95
                         transition-all duration-100 shadow-sm"
            >
              <X size={8} strokeWidth={2.5} className="text-white" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); minimizeWindow(appId); }}
              title="Minimize"
              className="w-3.5 h-3.5 rounded bg-amber-400 flex items-center justify-center
                         hover:brightness-125 hover:scale-110 active:scale-95
                         transition-all duration-100 shadow-sm"
            >
              <Minus size={8} strokeWidth={2.5} className="text-white" />
            </button>
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

          {/* Title centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none">
            <span className={`text-[12px] font-medium ${
              isActive ? "text-black/60 dark:text-white/55" : "text-black/40 dark:text-white/35"
            }`}>{title}</span>
            <ChevronDown size={11} className={isActive ? "text-black/40 dark:text-white/35" : "text-black/25 dark:text-white/20"} />
          </div>
        </div>

        {/* Row 2: Toolbar */}
        <div className={`max-w-full overflow-x-auto overflow-y-hidden flex items-center gap-0.5 shrink-0 ${
          isActive
            ? "bg-[#f5f5f5] dark:bg-[#222018]"
            : "bg-[#f9f9f9] dark:bg-[#1c1a17]"
        }`}>
          <div className={`flex items-center h-9 px-2 gap-0.5 shrink-0 border-b ${
            isActive
              ? "bg-[#f5f5f5] dark:bg-[#222018] border-black/8 dark:border-white/6"
              : "bg-[#f9f9f9] dark:bg-[#1c1a17] border-black/5 dark:border-white/4"
          }`} >
            <ToolBtn icon={Undo2}   label="Undo" />
            <ToolBtn icon={Redo2}   label="Redo" />
            <Divider />
            <button className="flex items-center gap-1 px-2 py-1 text-[11px] text-gray-500 dark:text-white/40
                              hover:bg-black/5 dark:hover:bg-white/6 hover:text-gray-700 dark:hover:text-white/65
                              rounded transition-colors">
              Zoom <ChevronDown size={10} />
            </button>
            <Divider />
            <ToolBtn icon={Bold}      label="Bold" />
            <ToolBtn icon={Italic}    label="Italic" />
            <ToolBtn icon={Underline} label="Underline" />
            <Divider />
            <ToolBtn icon={AlignLeft}   label="Align left" />
            <ToolBtn icon={AlignCenter} label="Center" />
            <ToolBtn icon={AlignRight}  label="Align right" />
            <Divider />
            <ToolBtn icon={Link}          label="Add link" />
            <ToolBtn icon={MessageSquare} label="Comment" />
            <Divider />
            <ToolBtn icon={Search}   label="Search" />
            <ToolBtn icon={Settings} label="Settings" />
            <div className="flex-1" />

            {/* CTA — opens Aprix chat */}
            <button
              onClick={toggleChat}
              className="text-[11.5px] font-semibold bg-ph-purple text-white px-3 py-1 rounded
                        hover:bg-[#7d659a] transition-colors shrink-0"
            >
              {t.appWindow.getStarted}
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-[#1d1b17]">
          {children}
        </div>
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
