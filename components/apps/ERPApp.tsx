"use client";

import { ExternalLink, Github, BarChart2, Users, ShoppingCart, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SLACK_BLUE = "#36C5F0";
const FEATURE_ICONS = [Building2, ShoppingCart, BarChart2, Users] as const;

export default function ERPApp() {
  const { t } = useLanguage();
  const e = t.erp;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark">
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8"
           style={{ background: "linear-gradient(135deg, #36C5F018 0%, transparent 70%)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${SLACK_BLUE}33` }}>
            <Building2 size={24} style={{ color: SLACK_BLUE }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90">ERP Multi-Empresa</h1>
            <p className="text-xs font-semibold" style={{ color: SLACK_BLUE }}>{e.tagline}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-white/45 max-w-lg leading-relaxed mb-5">{e.description}</p>
        <div className="flex gap-2">
          <a href="https://lucasrubo.github.io/ERP/dashboard" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-white px-4 py-2 rounded-md hover:brightness-90 transition-all"
            style={{ backgroundColor: SLACK_BLUE }}>
            {e.liveDemo} <ExternalLink size={11} />
          </a>
          <a href="https://github.com/lucasrubo/ERP" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/55 px-4 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <Github size={11} /> {e.sourceCode}
          </a>
        </div>
      </div>

      <div className="px-8 py-6">
        <h2 className="text-sm font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-4">
          {e.sectionFeatures}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {e.features.map((feat, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={feat.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${SLACK_BLUE}26` }}>
                  <Icon size={15} style={{ color: SLACK_BLUE }} />
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
            {e.sectionStack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "React Hook Form"].map((tech) => (
              <span key={tech} className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ backgroundColor: `${SLACK_BLUE}1a`, color: SLACK_BLUE }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
