"use client";

import { useRef, useState } from "react";
import { Monitor, Link } from "lucide-react";
import type { DesktopIconDef } from "@/lib/desktopIcons";

interface DesktopIconProps {
  icon: DesktopIconDef;
  position: { x: number; y: number };
  onOpen: (clickPos: { x: number; y: number }) => void;
  onDragEnd: (pos: { x: number; y: number }) => void;
}

export default function DesktopIcon({ icon, position, onOpen, onDragEnd }: DesktopIconProps) {
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const hasDragged = useRef(false);

  const displayPos = dragPos ?? position;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    hasDragged.current = false;

    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const onMove = (ev: MouseEvent) => {
      const dist = Math.abs(ev.clientX - e.clientX) + Math.abs(ev.clientY - e.clientY);
      if (!hasDragged.current && dist > 4) hasDragged.current = true;
      if (hasDragged.current) {
        setDragPos({
          x: Math.max(0, ev.clientX - startX),
          y: Math.max(0, ev.clientY - startY),
        });
      }
    };

    const onUp = (ev: MouseEvent) => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (hasDragged.current) {
        onDragEnd({
          x: Math.max(0, ev.clientX - startX),
          y: Math.max(0, ev.clientY - startY),
        });
        setDragPos(null);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasDragged.current) onOpen({ x: e.clientX, y: e.clientY });
    hasDragged.current = false;
  };

  return (
    <div
      style={{
        position: "absolute",
        left: displayPos.x,
        top: displayPos.y,
        zIndex: dragPos ? 1000 : 10,
      }}
      className="group flex flex-col items-center gap-1 w-14 p-1 rounded-lg
                 hover:bg-black/10 dark:hover:bg-white/8
                 active:bg-black/15 dark:active:bg-white/12
                 transition-colors cursor-default select-none"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      title={icon.label}
    >
      {/* Icon graphic */}
      <div className="w-12 h-12 relative">
        <IconGraphic icon={icon} />
      </div>

      {/* Label — dark in light mode, white in dark mode */}
      <span
        className="text-[10.5px] font-medium text-center leading-tight
                   text-ph-dark dark:text-white/90
                   px-1 py-0.5 rounded max-w-full truncate w-full
                   group-hover:bg-white/60 dark:group-hover:bg-white/12"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.12)" }}
      >
        {icon.label}
      </span>
    </div>
  );
}

function IconGraphic({ icon }: { icon: DesktopIconDef }) {
  const { type, color = "#6b7280" } = icon;

  // Custom icon override — emoji or image URL
  if (icon.icon) {
    const isUrl = icon.icon.startsWith("/") || icon.icon.startsWith("http");
    return (
      <div
        className="w-full h-full rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: `linear-gradient(145deg, ${color}dd, ${color}99)` }}
      >
        {isUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon.icon} alt={icon.label} className="w-8 h-8 object-contain" />
        ) : (
          <span className="text-2xl leading-none">{icon.icon}</span>
        )}
      </div>
    );
  }

  if (type === "folder") {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <path d="M4 16 Q4 12 8 12 H18 L22 8 H40 Q44 8 44 12 V36 Q44 40 40 40 H8 Q4 40 4 36 Z" fill={color} />
        <path d="M4 18 H44 V36 Q44 40 40 40 H8 Q4 40 4 36 Z" fill={color} opacity="0.8" />
        <path d="M6 18 H42 V22 Q24 24 6 22 Z" fill="white" opacity="0.15" />
      </svg>
    );
  }

  if (type === "mdx") {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <path d="M8 4 H32 L40 12 V44 Q40 46 38 46 H10 Q8 46 8 44 Z" fill="white" stroke="#e5e7eb" strokeWidth="1" />
        <path d="M32 4 L40 12 H34 Q32 12 32 10 Z" fill="#e5e7eb" />
        <rect x="8" y="4" width="24" height="5" rx="1" fill={color} opacity="0.8" />
        <rect x="13" y="18" width="22" height="2" rx="1" fill="#d1d5db" />
        <rect x="13" y="23" width="18" height="2" rx="1" fill="#d1d5db" />
        <rect x="13" y="28" width="20" height="2" rx="1" fill="#d1d5db" />
        <rect x="13" y="33" width="14" height="2" rx="1" fill="#d1d5db" />
        <rect x="8" y="36" width="20" height="8" rx="2" fill={color} />
        <text x="18" y="42.5" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="monospace">.mdx</text>
      </svg>
    );
  }

  if (type === "mov") {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <rect x="4" y="8" width="40" height="32" rx="4" fill="#1d1b17" />
        <rect x="4" y="8" width="5" height="32" fill="#111" />
        <rect x="39" y="8" width="5" height="32" fill="#111" />
        {[11, 18, 25, 32].map((y) => (
          <g key={y}>
            <rect x="5.5" y={y} width="2" height="4" rx="1" fill="#333" />
            <rect x="40.5" y={y} width="2" height="4" rx="1" fill="#333" />
          </g>
        ))}
        <rect x="11" y="10" width="26" height="28" rx="2" fill={color} opacity="0.9" />
        <circle cx="24" cy="24" r="8" fill="white" opacity="0.9" />
        <path d="M21 20 L30 24 L21 28 Z" fill={color} />
        <rect x="29" y="33" width="16" height="7" rx="2" fill="#374151" />
        <text x="37" y="38.5" textAnchor="middle" fill="white" fontSize="5.5" fontWeight="bold" fontFamily="monospace">.mov</text>
      </svg>
    );
  }

  if (type === "trash") {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <rect x="10" y="14" width="28" height="30" rx="3" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
        <rect x="14" y="18" width="20" height="22" rx="2" fill="white" />
        <rect x="18" y="22" width="3" height="14" rx="1.5" fill="#9ca3af" />
        <rect x="22.5" y="22" width="3" height="14" rx="1.5" fill="#9ca3af" />
        <rect x="27" y="22" width="3" height="14" rx="1.5" fill="#9ca3af" />
        <rect x="8" y="10" width="32" height="5" rx="2.5" fill="#d1d5db" />
        <rect x="18" y="6" width="12" height="5" rx="2.5" fill="#d1d5db" />
      </svg>
    );
  }

  // Default: "app" or "link" — colored rounded square
  const IconComp = type === "link" ? Link : Monitor;
  return (
    <div
      className="w-full h-full rounded-xl flex items-center justify-center shadow-sm"
      style={{ background: `linear-gradient(145deg, ${color}dd, ${color}99)` }}
    >
      <IconComp size={22} className="text-white drop-shadow" />
    </div>
  );
}
