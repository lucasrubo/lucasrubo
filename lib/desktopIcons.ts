export type IconType = "mdx" | "folder" | "mov" | "app" | "trash" | "link";

export interface DesktopIconDef {
	id: string;
	label: string;
	type: IconType;
	color?: string;
	appId: string;
	/** Custom icon override: emoji ("🚀") or image URL ("/icons/app.png"). Replaces the default SVG. */
	icon?: string;
}

// Left column — main portfolio sections
export const LEFT_ICONS: DesktopIconDef[] = [
	{
		id: "about-mdx",
		label: "about.mdx",
		type: "mdx",
		color: "#6e8cf9",
		appId: "about",
	},
	{
		id: "projects-dir",
		label: "projects/",
		type: "folder",
		color: "#f54e00",
		appId: "projects",
	},
	{
		id: "courses-dir",
		label: "courses/",
		type: "folder",
		color: "#2EB67D",
		appId: "courses",
	},
	{
		id: "skills-txt",
		label: "skills.txt",
		type: "mdx",
		color: "#987cb0",
		appId: "skills",
	},
	{
		id: "experience",
		label: "experience.mdx",
		type: "mdx",
		color: "#ECB22E",
		appId: "experience",
	},
	{
		id: "contact-mdx",
		label: "contact.mdx",
		type: "mdx",
		color: "#E01E5A",
		appId: "contact",
	},
];

// Right column — links & utilities
export const RIGHT_ICONS: DesktopIconDef[] = [
	{
		id: "whatsapp-link",
		label: "WhatsApp",
		type: "app",
		color: "#25D366",
		appId: "whatsapp",
		icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
	},
	{
		id: "github-link",
		label: "GitHub",
		type: "app",
		color: "#1d1b17",
		appId: "github",
	},
	{
		id: "linkedin-lnk",
		label: "LinkedIn",
		type: "app",
		color: "#0077b5",
		appId: "linkedin",
	},
	{
		id: "instagram-link",
		label: "Instagram",
		type: "app",
		color: "#E1306C",
		appId: "instagram",
		icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
	},
	{
		id: "trash",
		label: "Trash",
		type: "trash",
		color: "#9ca3af",
		appId: "about",
	},
];

export const MIDDLE_ICONS: DesktopIconDef[] = [
	{
		id: "finance-app",
		label: "Finance",
		type: "app",
		color: "#FFFFFF",
		appId: "finance",
		icon: "/Finance.png",
	},
	{
		id: "portfolio-app",
		label: "Portfolio",
		type: "app",
		color: "#FFFFFF",
		appId: "portfolio",
		icon: "/portfolio.png",
	},
];

export const ALL_ICONS: DesktopIconDef[] = [
	...LEFT_ICONS,
	...RIGHT_ICONS,
	...MIDDLE_ICONS,
];
