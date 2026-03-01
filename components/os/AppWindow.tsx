"use client";

import { useRef, useCallback, useState, useEffect, useLayoutEffect } from "react";
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
  launchOrigin?: { x: number; y: number };
  children: React.ReactNode;
}

const MIN_W = 320;
const MIN_H = 200;

// Resize handles — dir encodes which edges to move
// z-10 keeps them above the inner visual window div (same stacking context, later in DOM)
const RESIZE_HANDLES = [
  { dir: "n",  style: "absolute top-0    left-4    right-4   h-2   cursor-n-resize  z-10" },
  { dir: "s",  style: "absolute bottom-0 left-4    right-4   h-2   cursor-s-resize  z-10" },
  { dir: "e",  style: "absolute top-4    right-0   bottom-4  w-2   cursor-e-resize  z-10" },
  { dir: "w",  style: "absolute top-4    left-0    bottom-4  w-2   cursor-w-resize  z-10" },
  { dir: "nw", style: "absolute top-0    left-0    w-5       h-5   cursor-nw-resize z-10" },
  { dir: "ne", style: "absolute top-0    right-0   w-5       h-5   cursor-ne-resize z-10" },
  { dir: "sw", style: "absolute bottom-0 left-0    w-5       h-5   cursor-sw-resize z-10" },
  { dir: "se", style: "absolute bottom-0 right-0   w-5       h-5   cursor-se-resize z-10" },
] as const;

export default function AppWindow({
  appId, title, position, size,
  isMinimized, isMaximized, zIndex, isActive, launchOrigin, children,
}: AppWindowProps) {
  const {
    closeWindow, minimizeWindow, toggleMaximize, focusWindow,
    updatePosition, updateSize, taskbarBoundsRef, openWindow,
    registerMinimizeCallback,
  } = useWindows();
  const { t } = useLanguage();
  const isDragging = useRef(false);

  // Stable refs so doMinimize doesn't depend on position/size (avoids stale closure)
  const positionRef = useRef(position);
  positionRef.current = position;
  const sizeRef = useRef(size);
  sizeRef.current = size;

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

  // ── Close animation ───────────────────────────────────────────────────────
  const [toolbarVisible, setToolbarVisible] = useState(true);

  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsClosing(true);
      setTimeout(() => closeWindow(appId), 180);
    },
    [appId, closeWindow]
  );

  // ── Minimize fly-to-taskbar animation ────────────────────────────────────
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [minimizeStyle, setMinimizeStyle] = useState<React.CSSProperties>({});

  // Stable version — uses refs so it can be registered as a callback without stale closure
  const doMinimize = useCallback(() => {
    const target = taskbarBoundsRef.current[appId];
    const windowCenterX = positionRef.current.x + sizeRef.current.width / 2;
    const windowCenterY = positionRef.current.y + sizeRef.current.height / 2;
    const dx = target ? target.x - windowCenterX : 0;
    const dy = target
      ? target.y - windowCenterY
      : (typeof window !== "undefined" ? window.innerHeight : 800) - windowCenterY;

    setMinimizeStyle({
      transform: `translate(${dx}px, ${dy}px) scale(0.06)`,
      opacity: 0,
      transition: "transform 0.32s cubic-bezier(0.4,0,1,1), opacity 0.22s ease",
      pointerEvents: "none",
    });
    setIsMinimizing(true);
    setTimeout(() => {
      minimizeWindow(appId);
      setIsMinimizing(false);
      setMinimizeStyle({});
    }, 340);
  }, [appId, minimizeWindow, taskbarBoundsRef]);

  const handleMinimize = useCallback(
    (e: React.MouseEvent) => { e.stopPropagation(); doMinimize(); },
    [doMinimize]
  );

  // Register so Taskbar can trigger minimize animation from outside
  useEffect(() => {
    registerMinimizeCallback(appId, doMinimize);
  }, [appId, doMinimize, registerMinimizeCallback]);

  // ── Restore animation: fly from taskbar back to window ────────────────────
  type RestorePhase = "init" | "fly" | "done" | null;
  const [restorePhase, setRestorePhase] = useState<RestorePhase>(null);
  const restoreOffset = useRef({ dx: 0, dy: 0 });
  const prevIsMinimized = useRef(isMinimized);

  useLayoutEffect(() => {
    const was = prevIsMinimized.current;
    prevIsMinimized.current = isMinimized;

    if (was && !isMinimized) {
      // Transition: minimized → visible — animate from taskbar position
      const target = taskbarBoundsRef.current[appId];
      const cx = positionRef.current.x + sizeRef.current.width / 2;
      const cy = positionRef.current.y + sizeRef.current.height / 2;
      restoreOffset.current = {
        dx: target ? target.x - cx : 0,
        dy: target ? target.y - cy : 200,
      };
      setRestorePhase("init");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setRestorePhase("fly");
          setTimeout(() => {
            setRestorePhase("done");
            setTimeout(() => setRestorePhase(null), 300);
          }, 330);
        })
      );
    }
  }, [isMinimized, appId, taskbarBoundsRef]);

  // ── Maximize animation ────────────────────────────────────────────────────
  const prevMaxRef = useRef(isMaximized);
  const [maxAnim, setMaxAnim] = useState<"expand" | "restore" | null>(null);
  useEffect(() => {
    if (prevMaxRef.current === isMaximized) return;
    prevMaxRef.current = isMaximized;
    setMaxAnim(isMaximized ? "expand" : "restore");
    const t = setTimeout(() => setMaxAnim(null), 340);
    return () => clearTimeout(t);
  }, [isMaximized]);

  // ── Opening animation ─────────────────────────────────────────────────────
  // 3 phases when launchOrigin is set:
  //   'init' → tiny dot at click position (no transition)
  //   'fly'  → slides to window center, grows to 0.88 scale
  //   'open' → bouncy scale to 1 (final)
  // Without launchOrigin: skip 'fly', just 'init' → 'open'
  type AnimPhase = "init" | "fly" | "open";
  const [animPhase, setAnimPhase] = useState<AnimPhase>("init");
  const [offset, setOffset] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    if (!launchOrigin) {
      // Simple scale-up animation (menu bar, links inside apps, etc.)
      requestAnimationFrame(() => setAnimPhase("open"));
      return;
    }

    const el = windowRef.current;
    if (!el) { requestAnimationFrame(() => setAnimPhase("open")); return; }

    // Compute translation from click origin to window visual center
    const rect = el.getBoundingClientRect();
    const dx = launchOrigin.x - (rect.left + rect.width / 2);
    const dy = launchOrigin.y - (rect.top + rect.height / 2);
    setOffset({ dx, dy });

    // Wait for the offset re-render to paint (double rAF), then fly
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimPhase("fly");
        // After fly animation finishes, bounce open
        setTimeout(() => setAnimPhase("open"), 320);
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute animation styles for current phase
  const animStyle: React.CSSProperties = (() => {
    if (isClosing)
      return {
        transform: "scale(0.85)",
        opacity: 0,
        transition: "transform 0.18s ease-in, opacity 0.15s ease-in",
        pointerEvents: "none",
      };

    // Restore from taskbar animation (takes priority over open animation)
    if (restorePhase === "init")
      return {
        transform: `translate(${restoreOffset.current.dx}px, ${restoreOffset.current.dy}px) scale(0.06)`,
        opacity: 0,
        transition: "none",
      };
    if (restorePhase === "fly")
      return {
        transform: "scale(0.88)",
        opacity: 1,
        transition: "transform 0.33s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s ease",
      };
    if (restorePhase === "done")
      return {
        transform: "scale(1)",
        opacity: 1,
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
      };

    if (!launchOrigin) {
      if (animPhase === "init")
        return { transform: "scale(0.88)", opacity: 0, transition: "none" };
      return {
        transform: "scale(1)", opacity: 1,
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.16s ease",
      };
    }
    if (animPhase === "init")
      return {
        transform: `translate(${offset.dx}px, ${offset.dy}px) scale(0.08)`,
        opacity: 0, transition: "none",
      };
    if (animPhase === "fly")
      return {
        transform: "scale(0.88)", opacity: 1,
        transition: "transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s ease",
      };
    return {
      transform: "scale(1)", opacity: 1,
      transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
    };
  })();

  if (isMinimized && !isMinimizing) return null;

  // Outer div carries only positioning (no overflow-hidden, for resize handles)
  const outerStyle: React.CSSProperties = isMaximized
    ? { position: "absolute", inset: 0, bottom: "4rem", zIndex, ...(isMinimizing ? minimizeStyle : animStyle) }
    : { position: "absolute", top: position.y, left: position.x,
        width: size.width, height: size.height, zIndex,
        ...(isMinimizing ? minimizeStyle : animStyle) };

  return (
    <div
      ref={windowRef}
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
        className={`absolute inset-0 flex flex-col ${isMaximized ? "" : "rounded"} overflow-hidden ${
          isActive
            ? "shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
            : "shadow-[0_8px_28px_rgba(0,0,0,0.30)]"
        }`}
        style={
          maxAnim === "expand"
            ? { animation: "maximize-expand 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards" }
            : maxAnim === "restore"
              ? { animation: "maximize-restore 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards" }
              : undefined
        }
      >
        {/* Row 1: Title bar */}
        <div
          className={`flex items-center h-8 px-3 shrink-0 border-b relative justify-between ${
            isActive
              ? "bg-[#ddd] dark:bg-[#2c2a27] border-black/12 dark:border-white/8"
              : "bg-[#ebebeb] dark:bg-[#232120] border-black/7 dark:border-white/5"
          }`}
          onMouseDown={handleTitleBarMouseDown}
          style={{ cursor: isMaximized ? "default" : "grab" }}
        >
          
            <button
              onClick={(e) => { e.stopPropagation(); setToolbarVisible(v => !v); }}
              className="pointer-events-auto rounded hover:bg-black/8 dark:hover:bg-white/8 transition-colors p-0.5"
            >
              <ChevronDown
                size={11}
                className={`transition-transform duration-200 ${toolbarVisible ? "" : "-rotate-90"} ${isActive ? "text-black/40 dark:text-white/35" : "text-black/25 dark:text-white/20"}`}
              />
            </button>
          {/* Title centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 pointer-events-none">
            <span className={`text-[12px] font-medium ${
              isActive ? "text-black/60 dark:text-white/55" : "text-black/40 dark:text-white/35"
            }`}>{title}</span>
          </div>

          
          {/* Window controls */}
          <div className="flex items-center gap-1.5 shrink-0 z-10">
            <button
              onClick={handleMinimize}
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
            <button
              onClick={handleClose}
              title="Close"
              className="w-3.5 h-3.5 rounded bg-ph-orange flex items-center justify-center
                         hover:brightness-125 hover:scale-110 active:scale-95
                         transition-all duration-100 shadow-sm"
            >
              <X size={8} strokeWidth={2.5} className="text-white" />
            </button>
          </div>
        </div>

        {/* Row 2: Toolbar */}
        {appId !== "chatbot" && toolbarVisible && <div className={`flex max-w-full overflow-x-auto overflow-y-hidden items-center gap-0.5 shrink-0 ${
          isActive
            ? "bg-[#f5f5f5] dark:bg-[#222018]"
            : "bg-[#f9f9f9] dark:bg-[#1c1a17]"
        }`}>
          <div className={`flex flex-1 items-center h-9 px-2 gap-0.5 shrink-0 border-b ${
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

            {/* CTA — opens Aprix as a window */}
            <button
              onClick={() => openWindow("chatbot", { title: "Aprix.app", size: { width: 400, height: 540 } })}
              className="text-[11.5px] font-semibold bg-ph-purple text-white px-3 py-1 rounded
                        hover:bg-[#7d659a] transition-colors shrink-0"
            >
              {t.appWindow.getStarted}
            </button>
          </div>
        </div>}
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
