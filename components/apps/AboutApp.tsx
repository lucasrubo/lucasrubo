"use client";

import Image from "next/image";
import { MapPin, Mail, ExternalLink, Folder, Zap, Briefcase } from "lucide-react";
import { useWindows } from "@/contexts/WindowContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutApp() {
  const { openWindow } = useWindows();
  const { t } = useLanguage();
  const a = t.about;
  const b = a.bio;

  const exploreApps = [
    { appId: "projects",   title: "projects/",      Icon: Folder,   color: "#f54e00" },
    { appId: "skills",     title: "skills.txt",     Icon: Zap,      color: "#2EB67D" },
    { appId: "experience", title: "experience.mdx", Icon: Briefcase,color: "#ECB22E" },
    { appId: "contact",    title: "contact.mdx",    Icon: Mail,     color: "#E01E5A" },
  ] as const;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark">
      {/* Hero */}
      <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-white/8 bg-linear-to-br from-ph-cream/50 to-white dark:from-ph-orange/5 dark:to-ph-dark">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-ph-orange to-[#d94400] flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0">
            <Image src="/avatar.jpg" alt="Avatar" width={80} height={80} className="rounded-2xl object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90 tracking-tight">
              Lucas Gabriel Rubo
            </h1>
            <p className="text-ph-orange font-semibold text-sm mt-0.5">{a.role}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-400 dark:text-white/35">
              <span className="flex items-center gap-1"><MapPin size={11} /> Valinhos, São Paulo, Brazil</span>
              <span className="flex items-center gap-1"><Mail size={11} /> lucasrubo1@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-8 py-6 border-b border-gray-100 dark:border-white/8">
        <h2 className="text-sm font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">
          {a.sectionAbout}
        </h2>
        <p className="text-sm text-gray-600 dark:text-white/55 leading-relaxed max-w-2xl">
          {b.part1}
          <span className="font-semibold text-ph-dark dark:text-white/85">{b.areco}</span>
          {b.part2}
          <span className="font-semibold text-ph-dark dark:text-white/85">{b.csharp}</span>
          {b.part3}
          <span className="font-semibold text-ph-dark dark:text-white/85">{b.nextjs}</span>
          {b.part4}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {a.bioTags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/60 px-2.5 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Explore */}
      <div className="px-8 py-6">
        <h2 className="text-sm font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-4">
          {a.sectionExplore}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {exploreApps.map(({ appId, title, Icon, color }, i) => {
            const item = a.exploreItems[i];
            return (
              <button
                key={appId}
                onClick={() => openWindow(appId, { title, size: { width: 780, height: 580 } })}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl
                           border border-gray-100 dark:border-white/8
                           hover:border-ph-orange/30 dark:hover:border-ph-orange/40
                           hover:shadow-md dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)]
                           bg-white dark:bg-[#252320] transition-all text-center"
              >
                <Icon size={24} style={{ color }} />
                <span className="text-sm font-bold text-ph-dark dark:text-white/85 group-hover:text-ph-orange transition-colors">
                  {item.label}
                </span>
                <span className="text-xs text-gray-400 dark:text-white/35">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Links */}
      <div className="px-8 pb-8">
        <div className="flex gap-3">
          <a href="https://github.com/lucasrubo" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-ph-dark dark:bg-white/10 dark:hover:bg-white/15 px-4 py-2 rounded-md hover:bg-ph-dark/80 transition-colors">
            GitHub <ExternalLink size={11} />
          </a>
          <a href="https://linkedin.com/in/lucas-rubo" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0077b5] px-4 py-2 rounded-md hover:bg-[#006097] transition-colors">
            LinkedIn <ExternalLink size={11} />
          </a>
          <button
            onClick={() => openWindow("contact", { title: "contact.mdx", size: { width: 640, height: 520 } })}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-ph-orange px-4 py-2 rounded-md hover:bg-[#d94400] transition-colors">
            {a.hireMe}
          </button>
        </div>
      </div>
    </div>
  );
}
