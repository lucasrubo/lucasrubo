"use client";

import { useState, useRef } from "react";
import {
	LEFT_ICONS,
	MIDDLE_ICONS,
	RIGHT_ICONS,
	type DesktopIconDef,
} from "@/lib/desktopIcons";
import { IconGraphic } from "./DesktopIcon";
import MobileAppModal from "./MobileAppModal";
import Image from "next/image";

const EXTERNAL_LINKS: Record<string, string> = {
	github: "https://github.com/lucasrubo",
	linkedin: "https://linkedin.com/in/lucas-rubo",
	whatsapp: "https://wa.me/5519994019804",
	instagram: "https://instagram.com/lucas.rubo",
};

const APRIX_ICON: DesktopIconDef = {
	id: "chatbot",
	label: "Aprix",
	type: "app",
	color: "#FFFFFF",
	appId: "chatbot",
	icon: "/Aprix.png",
};

const PAGES = [LEFT_ICONS, [...MIDDLE_ICONS, APRIX_ICON], RIGHT_ICONS];

interface MobileIconCellProps {
	icon: DesktopIconDef;
	onTap: () => void;
}

function MobileIconCell({ icon, onTap }: MobileIconCellProps) {
	const touchRef = useRef<{ moved: boolean; startX: number; startY: number }>({
		moved: false,
		startX: 0,
		startY: 0,
	});

	return (
		<button
			className="mobile-icon-tap flex flex-col items-center gap-1.5 select-none focus:outline-none"
			onTouchStart={(e) => {
				touchRef.current = {
					moved: false,
					startX: e.touches[0].clientX,
					startY: e.touches[0].clientY,
				};
			}}
			onTouchMove={(e) => {
				const dx = Math.abs(e.touches[0].clientX - touchRef.current.startX);
				const dy = Math.abs(e.touches[0].clientY - touchRef.current.startY);
				if (dx > 6 || dy > 6) touchRef.current.moved = true;
			}}
			onTouchEnd={() => {
				if (!touchRef.current.moved) onTap();
			}}
			onClick={onTap}
		>
			<div className="w-15 h-15">
				<IconGraphic icon={icon} />
			</div>
			<span
				className="text-[11px] font-medium text-white text-center leading-tight w-full truncate px-0.5"
				style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
			>
				{icon.label}
			</span>
		</button>
	);
}

export default function MobileHomeScreen() {
	const [currentPage, setCurrentPage] = useState(0);
	const [openApp, setOpenApp] = useState<{
		appId: string;
		title: string;
	} | null>({ appId: "welcome", title: "welcome.app" });

	const handleIconTap = (icon: DesktopIconDef) => {
		if (EXTERNAL_LINKS[icon.appId]) {
			window.open(EXTERNAL_LINKS[icon.appId], "_blank");
			return;
		}
		setOpenApp({ appId: icon.appId, title: icon.label });
	};

	return (
		<div className="flex-1 flex flex-col overflow-hidden">
			{/* ── Swipeable pages ── */}
			<div className="flex-1 overflow-hidden">
				<div
					className="mobile-pages-scroll flex h-full desktop-surface"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E") `,
						overflowX: "scroll",
						scrollSnapType: "x mandatory",
						scrollBehavior: "smooth",
						WebkitOverflowScrolling:
							"touch" as React.CSSProperties["WebkitOverflowScrolling"],
						scrollbarWidth: "none" as React.CSSProperties["scrollbarWidth"],
						msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
					}}
					onScroll={(e) => {
						const el = e.currentTarget;
						const page = Math.round(el.scrollLeft / el.offsetWidth);
						setCurrentPage(page);
					}}
				>
					{PAGES.map((icons, pageIndex) => (
						<div
							key={pageIndex}
							style={{
								scrollSnapAlign: "start",
								flexShrink: 0,
								width: "100vw",
							}}
						>
							<div className="grid grid-cols-4 gap-x-2 gap-y-6 px-6 pt-10 pb-4">
								{icons.map((icon) => (
									<MobileIconCell
										key={icon.id}
										icon={icon}
										onTap={() => handleIconTap(icon)}
									/>
								))}
							</div>
						</div>
					))}

					<Image
						className="opacity-10 blur-sm pointer-events-none object-cover"
						src="/bg.jpg"
						alt="Background"
						fill
					/>
				</div>
			</div>

			{/* ── Page dots ── */}
			<div className="flex items-center justify-center gap-2 py-2">
				{PAGES.map((_, i) => (
					<div
						key={i}
						className={`h-1.5 rounded-full transition-all duration-300 ${
							i === currentPage ? "bg-white w-4" : "bg-white/50 w-1.5"
						}`}
						style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
					/>
				))}
			</div>
			{/* ── App modal ── */}
			{openApp && (
				<MobileAppModal
					appId={openApp.appId}
					title={openApp.title}
					onClose={() => setOpenApp(null)}
				/>
			)}
		</div>
	);
}
