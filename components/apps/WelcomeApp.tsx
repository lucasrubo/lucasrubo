"use client";

import { User, Folder, Zap, Briefcase, Mail, Film } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWindows } from "@/contexts/WindowContext";
import { useAprix } from "@/contexts/AprixContext";

const SHORTCUTS = [
  { appId: "about",      title: "about.mdx",     Icon: User,      color: "#6e8cf9", labelEN: "About",      labelPT: "Sobre"       },
  { appId: "projects",   title: "projects/",      Icon: Folder,    color: "#f54e00", labelEN: "Projects",   labelPT: "Projetos"    },
  { appId: "skills",     title: "skills.txt",     Icon: Zap,       color: "#2EB67D", labelEN: "Skills",     labelPT: "Habilidades" },
  { appId: "experience", title: "experience.mdx", Icon: Briefcase, color: "#ECB22E", labelEN: "Experience", labelPT: "Experiência" },
  { appId: "contact",    title: "contact.mdx",    Icon: Mail,      color: "#E01E5A", labelEN: "Contact",    labelPT: "Contato"     },
  { appId: "roteirum",   title: "Roteirum.app",   Icon: Film,      color: "#987cb0", labelEN: "Roteirum",   labelPT: "Roteirum"    },
] as const;

export default function WelcomeApp() {
  const { locale } = useLanguage();
  const { openWindow } = useWindows();
  const { toggleChat } = useAprix();

  const isPT = locale === "ptBR";

  const hour = new Date().getHours();
  const greeting = isPT
    ? hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"
    : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center select-none overflow-y-auto">

      {/* Greeting */}
      <div className="mb-8">
        <p className="font-mono text-[11px] text-white/30 tracking-[0.2em] uppercase mb-3">
          lucas rubo · os
        </p>
        <p className="text-2xl font-semibold text-white/90 mb-2 tracking-tight">
          {greeting}
        </p>
        <p className="text-[11px] text-white/28 font-mono">
          {new Date().toLocaleDateString(isPT ? "pt-BR" : "en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Divider */}
      <div className="w-24 h-px bg-white/10 mb-7" />

      {/* Shortcuts */}
      <p className="text-[10px] text-white/28 uppercase tracking-widest font-mono mb-4">
        {isPT ? "explorar" : "explore"}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-[280px]">
        {SHORTCUTS.map(({ appId, title, Icon, color, labelEN, labelPT }) => (
          <button
            key={appId}
            onClick={() => openWindow(appId, { title, size: { width: 800, height: 600 } })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-white/4 hover:bg-white/9 active:bg-white/12
                       border border-white/7 hover:border-white/16
                       transition-all text-white/55 hover:text-white/90"
          >
            <Icon size={11} style={{ color }} />
            <span className="text-[11px] font-medium leading-none">
              {isPT ? labelPT : labelEN}
            </span>
          </button>
        ))}
      </div>

      {/* Aprix CTA */}
      <button
        onClick={toggleChat}
        className="font-mono text-[11px] tracking-[0.12em] text-white/35 hover:text-white/70
                   border-b border-white/15 hover:border-white/35
                   pb-0.5 transition-all uppercase"
      >
        {isPT ? "↗ abrir aprix" : "↗ open aprix"}
      </button>
    </div>
  );
}
