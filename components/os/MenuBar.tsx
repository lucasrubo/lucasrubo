"use client";

import { Github, Linkedin, Download, MessageCircle } from "lucide-react";
import { useWindows } from "@/contexts/WindowContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAprix } from "@/contexts/AprixContext";
import Image from 'next/image'

const NAV_IDS = [
  { appId: "about",      title: "about.mdx"     },
  { appId: "projects",   title: "projects/"      },
  { appId: "skills",     title: "skills.txt"     },
  { appId: "experience", title: "experience.mdx" },
  { appId: "contact",    title: "contact.mdx"    },
] as const;

function LRMark() {
  return (
    <div className="w-6 h-6 rounded-md bg-white/80 flex items-center justify-center">
      <Image src="/icon.png" alt="Lucas Rubo" width={14} height={14} />
    </div>
  );
}

export default function MenuBar() {
  const { openWindow } = useWindows();
  const { locale, toggleLocale, t } = useLanguage();
  const { toggleChat, apiOnline } = useAprix();

  // Nav labels in the current locale — same order as NAV_IDS
  const navLabels = [
    t.about.sectionAbout,
    t.about.exploreItems[0].label, // "Projects" / "Projetos"
    t.skills.title,
    t.experience.title,
    t.contact.title,
  ];

  return (
    <header className="h-9 bg-[#1a1815] flex items-center px-3 gap-1 select-none shrink-0 z-50">
      {/* Logo */}
      <button
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 transition-colors mr-1"
        onClick={() => openWindow("about", { title: "about.mdx", size: { width: 800, height: 600 } })}
      >
        <LRMark />
        <span className="text-white/85 text-[13px] font-semibold tracking-tight">AprixOS</span>
      </button>

      <div className="w-px h-4 bg-white/15 mx-1" />

      {/* Nav items */}
      {NAV_IDS.map((item, i) => (
        <button
          key={item.appId}
          onClick={() => openWindow(item.appId, { title: item.title, size: { width: 800, height: 600 } })}
          className="px-2.5 py-1 text-[13px] text-white/65 hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          {navLabels[i]}
        </button>
      ))}

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-1">
        <a href="https://github.com/lucasrubo" target="_blank" rel="noopener noreferrer"
          className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
          aria-label="GitHub">
          <Github size={14} />
        </a>
        <a href="https://linkedin.com/in/lucas-rubo" target="_blank" rel="noopener noreferrer"
          className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
          aria-label="LinkedIn">
          <Linkedin size={14} />
        </a>
        <button
          onClick={() => openWindow("contact", { title: "contact.mdx", size: { width: 640, height: 520 } })}
          className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded transition-colors"
          aria-label="Download resume">
          <Download size={14} />
        </button>

        <div className="w-px h-4 bg-white/15 mx-1" />

        {/* Language switcher — EN · PT toggle */}
        <button
          onClick={toggleLocale}
          aria-label={t.menuBar.langLabel}
          className="flex items-center px-2 py-1 rounded hover:bg-white/10 transition-colors"
        >
          <span className={`text-[11px] font-bold transition-colors ${locale === "en" ? "text-white" : "text-white/30"}`}>
            EN
          </span>
          <span className="text-white/20 text-[10px] mx-0.5">·</span>
          <span className={`text-[11px] font-bold transition-colors ${locale === "ptBR" ? "text-white" : "text-white/30"}`}>
            PT
          </span>
        </button>
      </div>
    </header>
  );
}
