"use client";

import { useRef, useEffect, useState } from "react";
import { X, Monitor, Link } from "lucide-react";
import { useWindows } from "@/contexts/WindowContext";
import { ALL_ICONS, type DesktopIconDef } from "@/lib/desktopIcons";
import type { WindowState } from "@/contexts/WindowContext";

// ── Map appId → desktop icon definition ─────────────────────────────────────
const ICON_MAP: Record<string, DesktopIconDef> = {};
ALL_ICONS.forEach((icon: DesktopIconDef) => {
	if (!ICON_MAP[icon.appId]) ICON_MAP[icon.appId] = icon;
});

// ── Mini icon graphic ─────────────────────────────────────────────────────────
function TaskbarIcon({ appId }: { appId: string }) {
	const iconDef = ICON_MAP[appId];

	if (!iconDef) {
		return (
			<div className="w-full h-full rounded-lg flex items-center justify-center bg-white/10">
				<Monitor size={16} className="text-white/50" />
			</div>
		);
	}

	const { type, color = "#6b7280", icon: customIcon, label } = iconDef;

	// ── Social logos ──────────────────────────────────────────────────────────
	if (appId === "github") {
		return (
			<div className="w-full h-full rounded-lg flex items-center justify-center bg-[#1d1b17]">
				<svg viewBox="0 0 16 16" fill="white" className="w-[62%] h-[62%]">
					<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
				</svg>
			</div>
		);
	}

	if (appId === "linkedin") {
		return (
			<div className="w-full h-full rounded-lg flex items-center justify-center bg-[#0077b5]">
				<svg viewBox="0 0 24 24" fill="white" className="w-[58%] h-[58%]">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
				</svg>
			</div>
		);
	}

	// ── Custom icon (URL or emoji) ────────────────────────────────────────────
	if (customIcon) {
		const isUrl = customIcon.startsWith("/") || customIcon.startsWith("http");
		return (
			<div
				className="w-full h-full rounded-lg flex items-center justify-center"
				style={{
					background: `linear-gradient(145deg, ${color}cc, ${color}77)`,
				}}
			>
				{isUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={customIcon}
						alt={label}
						className="w-[68%] h-[68%] object-contain"
					/>
				) : (
					<span className="text-base leading-none">{customIcon}</span>
				)}
			</div>
		);
	}

	if (type === "folder") {
		return (
			<svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
				<path
					d="M4 16 Q4 12 8 12 H18 L22 8 H40 Q44 8 44 12 V36 Q44 40 40 40 H8 Q4 40 4 36 Z"
					fill={color}
				/>
				<path
					d="M4 18 H44 V36 Q44 40 40 40 H8 Q4 40 4 36 Z"
					fill={color}
					opacity="0.8"
				/>
				<path d="M6 18 H42 V22 Q24 24 6 22 Z" fill="white" opacity="0.15" />
			</svg>
		);
	}

	if (type === "mdx") {
		return (
			<div
				className="w-full h-full rounded-lg flex items-center justify-center"
				style={{
					background: `linear-gradient(145deg, ${color}cc, ${color}77)`,
				}}
			>
				<span className="text-white font-bold text-[9px] tracking-tight">
					.mdx
				</span>
			</div>
		);
	}

	if (type === "mov") {
		return (
			<div
				className="w-full h-full rounded-lg flex items-center justify-center bg-[#1d1b17]"
				style={{ outline: `1px solid ${color}44` }}
			>
				<span className="text-sm leading-none">▶️</span>
			</div>
		);
	}

	const IconComp = type === "link" ? Link : Monitor;
	return (
		<div
			className="w-full h-full rounded-lg flex items-center justify-center"
			style={{ background: `linear-gradient(145deg, ${color}cc, ${color}77)` }}
		>
			<IconComp size={15} className="text-white drop-shadow" />
		</div>
	);
}

// ── Single taskbar item ──────────────────────────────────────────────────────
function TaskbarItem({ win }: { win: WindowState }) {
	const { activeAppId, focusWindow, closeWindow, setTaskbarBound } =
		useWindows();
	const isActive = win.appId === activeAppId && !win.isMinimized;
	const itemRef = useRef<HTMLDivElement>(null);

	// Register taskbar position for the minimize-fly animation
	useEffect(() => {
		const update = () => {
			if (!itemRef.current) return;
			const rect = itemRef.current.getBoundingClientRect();
			setTaskbarBound(win.appId, {
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
			});
		};
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [win.appId, setTaskbarBound]);

	// Bounce-in when a window first appears in the taskbar
	const [bounced, setBounced] = useState(false);
	useEffect(() => {
		const t = requestAnimationFrame(() => setBounced(true));
		return () => cancelAnimationFrame(t);
	}, []);

	return (
		<div
			ref={itemRef}
			role="button"
			tabIndex={0}
			onClick={() => focusWindow(win.appId)}
			onKeyDown={(e) => e.key === "Enter" && focusWindow(win.appId)}
			title={win.title}
			className={`
        group relative flex flex-col items-center gap-0.75 cursor-default select-none
        transition-transform duration-150
        ${bounced ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
        ${isActive ? "scale-105" : "hover:scale-110 active:scale-95"}
      `}
			style={{
				transition: bounced
					? "transform 0.15s ease, opacity 0.2s ease"
					: "none",
			}}
		>
			{/* Icon */}
			<div
				className={`
          w-9 h-9 relative overflow-hidden rounded-xl transition-all duration-150
          ${
						isActive
							? "shadow-[0_0_0_1.5px_rgba(255,255,255,0.25),0_4px_16px_rgba(0,0,0,0.5)]"
							: win.isMinimized
								? "opacity-55"
								: "opacity-85 group-hover:opacity-100"
					}
        `}
			>
				<TaskbarIcon appId={win.appId} />
			</div>

			{/* Status dot */}
			<div
				className={`w-1.25 h-1.25 rounded-full transition-all duration-200 ${
					isActive
						? "bg-white/90"
						: win.isMinimized
							? "bg-amber-400"
							: "bg-white/35"
				}`}
			/>

			{/* Tooltip */}
			<div
				className="
        absolute bottom-full mb-2 px-2.5 py-1 z-50
        bg-[#1a1814]/95 backdrop-blur-sm
        text-white/85 text-[11px] font-medium rounded-lg
        border border-white/8 shadow-xl
        opacity-0 group-hover:opacity-100 pointer-events-none
        transition-opacity duration-150 whitespace-nowrap
        -translate-x-1/2 left-1/2
      "
			>
				{win.title}
				{win.isMinimized && (
					<span className="ml-1.5 text-yellow-400/80 text-[9px]">
						minimizado
					</span>
				)}
			</div>

			{/* Close button */}
			<button
				onClick={(e) => {
					e.stopPropagation();
					closeWindow(win.appId);
				}}
				className="
          absolute -top-1 -right-1 w-4 h-4 rounded-full
          bg-ph-orange flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
          hover:brightness-110 shadow-md z-10
        "
				aria-label={`Fechar ${win.title}`}
			>
				<X size={8} strokeWidth={3} className="text-white" />
			</button>
		</div>
	);
}

// ── Taskbar ──────────────────────────────────────────────────────────────────
export default function Taskbar() {
	const { windows } = useWindows();

	return (
		<div className="shrink-0 flex items-center justify-center px-4 absolute left-0 right-0 bottom-0 z-[9999]">
			{windows.length > 0 && (
				<div
					className="
          flex items-end gap-2 px-3 pt-2 pb-1.5
          bg-black/8 dark:bg-white/6 backdrop-blur-xl
          border border-black/10 dark:border-white/10 rounded-2xl
          shadow-[0_4px_24px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]
          dark:shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]
          flex-wrap justify-center max-w-[calc(100vw-2rem)]
        "
				>
					{windows.map((win) => (
						<TaskbarItem key={win.appId} win={win} />
					))}
				</div>
			)}
		</div>
	);
}
