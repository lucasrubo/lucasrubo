"use client";

import { useEffect, useRef, useState } from "react";
import MenuBar from "./MenuBar";
import AppWindow from "./AppWindow";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import { WindowProvider, useWindows } from "@/contexts/WindowContext";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { LEFT_ICONS, RIGHT_ICONS } from "@/lib/desktopIcons";

import AboutApp      from "@/components/apps/AboutApp";
import ProjectsApp   from "@/components/apps/ProjectsApp";
import SkillsApp     from "@/components/apps/SkillsApp";
import ExperienceApp from "@/components/apps/ExperienceApp";
import ContactApp    from "@/components/apps/ContactApp";
import RoteirumApp   from "@/components/apps/RoteirumApp";
import ERPApp        from "@/components/apps/ERPApp";
import SignupApp     from "@/components/apps/SignupApp";

function AppContent({ appId }: { appId: string }) {
  if (appId === "about")      return <AboutApp />;
  if (appId === "projects")   return <ProjectsApp />;
  if (appId === "skills")     return <SkillsApp />;
  if (appId === "experience") return <ExperienceApp />;
  if (appId === "contact")    return <ContactApp />;
  if (appId === "roteirum")   return <RoteirumApp />;
  if (appId === "erp")        return <ERPApp />;
  if (appId === "larissa")    return <ProjectsApp />;
  if (appId === "signup")     return <SignupApp />;
  return <AboutApp />;
}

const ICON_H = 78; // approx height per icon row (76px icon + 2px gap)
const ALL_ICONS = [...LEFT_ICONS, ...RIGHT_ICONS];

type IconPositions = Record<string, { x: number; y: number }>;

function buildDefaultPositions(containerWidth: number): IconPositions {
  const positions: IconPositions = {};
  LEFT_ICONS.forEach((icon, i) => {
    positions[icon.id] = { x: 8, y: 12 + i * ICON_H };
  });
  RIGHT_ICONS.forEach((icon, i) => {
    // right-aligned: 8px from right edge, icon is 56px wide → left = w - 64
    positions[icon.id] = { x: containerWidth - 64, y: 12 + i * ICON_H };
  });
  return positions;
}

function DesktopInner() {
  const { windows, activeAppId, openWindow } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);

  // ── Icon positions ──────────────────────────────────────────────────────────
  const [iconPositions, setIconPositions] = useState<IconPositions>({});

  useEffect(() => {
    const w = desktopRef.current?.offsetWidth ?? window.innerWidth;
    setIconPositions(buildDefaultPositions(w));
  }, []);

  const handleIconDragEnd = (iconId: string, pos: { x: number; y: number }) => {
    setIconPositions((prev) => ({ ...prev, [iconId]: pos }));
  };

  // ── Context menu ────────────────────────────────────────────────────────────
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!contextMenu) return;
    // Delay so the right-click that opened the menu doesn't immediately close it
    const raf = requestAnimationFrame(() => {
      const close = () => setContextMenu(null);
      document.addEventListener("click", close, { once: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [contextMenu]);

  const sortIcons = () => {
    const w = desktopRef.current?.offsetWidth ?? window.innerWidth;
    setIconPositions(buildDefaultPositions(w));
    setContextMenu(null);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setContextMenu(null);
  };

  // ── Open default window ─────────────────────────────────────────────────────
  useEffect(() => {
    openWindow("about", { title: "about.mdx", size: { width: 800, height: 600 } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIconOpen = (appId: string, label: string, size?: { width: number; height: number }) => {
    if (appId === "github")   { window.open("https://github.com/lucasrubo", "_blank"); return; }
    if (appId === "linkedin") { window.open("https://linkedin.com/in/lucas-rubo", "_blank"); return; }
    openWindow(appId, { title: label, size });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <MenuBar />

      {/* Desktop surface */}
      <div
        ref={desktopRef}
        className="flex-1 relative overflow-hidden desktop-surface"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
        }}
      >
        {/* Icons — absolutely positioned and draggable */}
        {ALL_ICONS.map((icon) => {
          const pos = iconPositions[icon.id];
          if (!pos) return null;
          return (
            <DesktopIcon
              key={icon.id}
              icon={icon}
              position={pos}
              onOpen={() => handleIconOpen(icon.appId, icon.label)}
              onDragEnd={(newPos) => handleIconDragEnd(icon.id, newPos)}
            />
          );
        })}

        {/* Open windows */}
        {windows.map((win) => (
          <AppWindow
            key={win.appId}
            appId={win.appId}
            title={win.title}
            position={win.position}
            size={win.size}
            isMinimized={win.isMinimized}
            isMaximized={win.isMaximized}
            zIndex={win.zIndex}
            isActive={win.appId === activeAppId}
          >
            <AppContent appId={win.appId} />
          </AppWindow>
        ))}
      </div>

      <Taskbar />

      {/* Context menu — fixed positioning, no offset math needed */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onSort={sortIcons}
          onToggleTheme={toggleTheme}
          onOpenContact={() => {
            openWindow("contact", { title: "contact.mdx", size: { width: 640, height: 520 } });
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
}

// ── Context menu ────────────────────────────────────────────────────────────
interface ContextMenuProps {
  x: number;
  y: number;
  onSort: () => void;
  onToggleTheme: () => void;
  onOpenContact: () => void;
}

function ContextMenu({ x, y, onSort, onToggleTheme, onOpenContact }: ContextMenuProps) {
  const { t } = useLanguage();
  const menuW = 180;
  const menuH = 130;
  const safeX = Math.min(x, window.innerWidth - menuW - 8);
  const safeY = Math.min(y, window.innerHeight - menuH - 8);

  return (
    <div
      className="fixed z-9999 min-w-45 bg-[#2a2724]/96 backdrop-blur-xl
                 border border-white/10 rounded-xl
                 shadow-[0_8px_40px_rgba(0,0,0,0.6)] py-1.5 overflow-hidden"
      style={{ left: safeX, top: safeY }}
      onClick={(e) => e.stopPropagation()}
    >
      <CtxItem label={t.desktop.sortIcons}   shortcut="⌘J" onClick={onSort} />
      <CtxItem label={t.desktop.toggleTheme} shortcut="⌘T" onClick={onToggleTheme} />
      <div className="my-1 h-px bg-white/8 mx-2" />
      <CtxItem label={t.desktop.hireMe} onClick={onOpenContact} accent />
    </div>
  );
}

function CtxItem({
  label,
  shortcut,
  onClick,
  accent = false,
}: {
  label: string;
  shortcut?: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-4 px-3 py-1.5 text-xs
                  hover:bg-white/10 transition-colors
                  ${accent ? "text-ph-orange font-semibold" : "text-white/80"}`}
    >
      <span>{label}</span>
      {shortcut && <span className="text-white/30 font-mono text-[10px]">{shortcut}</span>}
    </button>
  );
}

export default function Desktop() {
  return (
    <LanguageProvider>
      <WindowProvider>
        <DesktopInner />
      </WindowProvider>
    </LanguageProvider>
  );
}
