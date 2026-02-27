export type IconType = "mdx" | "folder" | "mov" | "app" | "trash" | "link";

export interface DesktopIconDef {
  id: string;
  label: string;
  type: IconType;
  color?: string;
  appId: string;
}

// Left column — main portfolio sections
export const LEFT_ICONS: DesktopIconDef[] = [
  { id: "about-mdx",    label: "about.mdx",      type: "mdx",    color: "#6e8cf9", appId: "about"      },
  { id: "projects-dir", label: "projects/",       type: "folder", color: "#f54e00", appId: "projects"   },
  { id: "skills-txt",   label: "skills.txt",      type: "mdx",    color: "#2EB67D", appId: "skills"     },
  { id: "experience",   label: "experience.mdx",  type: "mdx",    color: "#ECB22E", appId: "experience" },
  { id: "contact-mdx",  label: "contact.mdx",     type: "mdx",    color: "#E01E5A", appId: "contact"    },
  { id: "roteirum-app", label: "Roteirum.app",     type: "mov",    color: "#987cb0", appId: "roteirum"   },
  { id: "erp-app",      label: "ERP.app",          type: "app",    color: "#36C5F0", appId: "erp"        },
  { id: "larissa-app",  label: "larissa-portfolio",type: "app",    color: "#E01E5A", appId: "larissa"    },
];

// Right column — links & utilities
export const RIGHT_ICONS: DesktopIconDef[] = [
  { id: "github-link",  label: "GitHub",           type: "app",    color: "#1d1b17", appId: "github"     },
  { id: "linkedin-lnk", label: "LinkedIn",         type: "app",    color: "#0077b5", appId: "linkedin"   },
  { id: "resume-pdf",   label: "resume.pdf",       type: "mdx",    color: "#E01E5A", appId: "contact"    },
  { id: "trash",        label: "Trash",            type: "trash",  color: "#9ca3af", appId: "about"      },
];
