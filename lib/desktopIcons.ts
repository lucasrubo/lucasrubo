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
  { id: "about-mdx",    label: "about.mdx",      type: "mdx",    color: "#6e8cf9", appId: "about"      },
  { id: "projects-dir", label: "projects/",       type: "folder", color: "#f54e00", appId: "projects"   },
  { id: "skills-txt",   label: "skills.txt",      type: "mdx",    color: "#2EB67D", appId: "skills"     },
  { id: "experience",   label: "experience.mdx",  type: "mdx",    color: "#ECB22E", appId: "experience" },
  { id: "contact-mdx",  label: "contact.mdx",     type: "mdx",    color: "#E01E5A", appId: "contact"    },
];

// Right column — links & utilities
export const RIGHT_ICONS: DesktopIconDef[] = [
  { id: "github-link",  label: "GitHub",           type: "app",    color: "#1d1b17", appId: "github"     },
  { id: "linkedin-lnk", label: "LinkedIn",         type: "app",    color: "#0077b5", appId: "linkedin"   },
  { id: "trash",        label: "Trash",            type: "trash",  color: "#9ca3af", appId: "about"      },
];

export const MIDDLE_ICONS: DesktopIconDef[] = [
  { id: "chatbot",      label: "Aprix",            type: "app",    color: "#ffffff", appId: "chatbot", icon: "/Aprix.png"    },
  { id: "finance-app",    label: "Finance",        type: "app",   color: "#6e8cf9", appId: "finance"  },
  { id: "portfolio-app",    label: "Portfolio",        type: "app",   color: "#6e8cf9", appId: "portfolio"  },
  { id: "larissa-app",  label: "larissa-portfolio",type: "app",    color: "#E01E5A", appId: "larissa"    },
  { id: "erp-app",      label: "ERP.app",          type: "app",    color: "#36C5F0", appId: "erp"        },
  { id: "roteirum-app", label: "Roteirum.app",     type: "mov",    color: "#987cb0", appId: "roteirum"   }
];