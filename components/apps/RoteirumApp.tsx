"use client";

import { ExternalLink, Github, Film, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FEATURE_ICONS = [Sparkles, Film, Film, Film] as const;

export default function RoteirumApp() {
  const { t } = useLanguage();
  const r = t.roteirum;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark">
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8"
           style={{ background: "linear-gradient(135deg, #987cb018 0%, transparent 70%)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-ph-purple/20 flex items-center justify-center">
            <Film size={24} className="text-ph-purple" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90">Roteirum</h1>
            <p className="text-xs font-semibold text-ph-purple">{r.tagline}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/45 max-w-lg leading-relaxed mb-5">{r.description}</p>
        <div className="flex gap-2">
          <a href="https://lucasrubo.github.io/Roteirum/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-ph-purple px-4 py-2 rounded-md hover:brightness-90 transition-all">
            {r.liveDemo} <ExternalLink size={11} />
          </a>
          <a href="https://github.com/lucasrubo/Roteirum" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/55 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <Github size={11} /> {r.sourceCode}
          </a>
        </div>
      </div>

      <div className="px-8 py-6">
        <h2 className="text-sm font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-4">
          {r.sectionFeatures}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {r.features.map((feat, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={feat.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8">
                <div className="w-8 h-8 rounded-lg bg-ph-purple/15 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-ph-purple" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ph-dark dark:text-white/85">{feat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-white/45 mt-0.5">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <h2 className="text-sm font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-3">
            {r.sectionStack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Tailwind CSS", "Vite", "React Query", "Radix UI"].map((tech) => (
              <span key={tech} className="text-xs bg-ph-purple/10 text-ph-purple px-2.5 py-1 rounded-full font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
