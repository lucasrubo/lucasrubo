"use client";

import { ExternalLink, Github, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PROJECTS = [
  {
    id: "roteirum",
    name: "Roteirum",
    image: "https://lucasrubo.github.io/portfolio/images/roteirum.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Query", "Radix UI"],
    demo: "https://lucasrubo.github.io/Roteirum/",
    github: "https://github.com/lucasrubo/Roteirum",
    color: "#987cb0",
    featured: true,
  },
  {
    id: "erp",
    name: "ERP Multi-Empresa",
    image: "https://lucasrubo.github.io/portfolio/images/erp.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "React Hook Form"],
    demo: "https://lucasrubo.github.io/ERP/dashboard",
    github: "https://github.com/lucasrubo/ERP",
    color: "#36C5F0",
    featured: true,
  },
  {
    id: "larissa",
    name: "Larissa Arendt",
    image: "https://lucasrubo.github.io/portfolio/images/portfolio.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Radix UI"],
    demo: "https://larissaarendt.github.io/portfolio/",
    github: "https://github.com/larissaarendt/portfolio",
    color: "#E01E5A",
    featured: false,
  },
];

export default function ProjectsApp() {
  const { t } = useLanguage();
  const p = t.projects;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark overflow-auto">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8 bg-linear-to-b from-ph-cream/40 to-white dark:from-transparent dark:to-ph-dark">
        <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90 tracking-tight mb-1">
          {p.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-white/45">
          {p.subtitleWork} — {PROJECTS.length} {p.projectsCount}
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((proj, i) => (
          <div
            key={proj.id}
            className="group border border-gray-100 dark:border-white/8 rounded-xl hover:border-gray-300 dark:hover:border-white/20 hover:shadow-lg dark:hover:shadow-black/40 transition-all bg-white dark:bg-white/4 flex flex-col overflow-hidden"
          >
            {/* Image banner */}
            <div className="relative h-40 overflow-hidden bg-gray-50 dark:bg-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const parent = el.parentElement!;
                  parent.style.background = `linear-gradient(135deg, ${proj.color}33, ${proj.color}11)`;
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              {proj.featured && (
                <span className="absolute top-3 right-3 flex items-center gap-0.5 text-[10px] font-bold text-yellow-700 bg-yellow-100/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                  <Star size={9} className="fill-yellow-500 text-yellow-500" /> {p.featured}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 rounded-full shrink-0" style={{ backgroundColor: proj.color }} />
                <h2 className="text-base font-bold text-ph-dark dark:text-white/85 leading-tight">
                  {proj.name}
                </h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-white/45 leading-relaxed mb-4 flex-1">
                {p.items[i].description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-white/50 px-2 py-0.5 rounded font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold border border-gray-200 dark:border-white/12 text-gray-600 dark:text-white/60 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <Github size={12} /> {p.code}
                </a>
                <a
                  href={proj.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-white py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: proj.color }}
                >
                  <ExternalLink size={11} /> {p.liveDemo}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More on GitHub */}
      <div className="px-6 pb-8">
        <a
          href="https://github.com/lucasrubo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-gray-200 dark:border-white/12 rounded-xl text-sm text-gray-400 dark:text-white/30 hover:border-ph-orange/40 hover:text-ph-orange transition-colors"
        >
          <Github size={15} /> {p.moreOnGithub}
        </a>
      </div>
    </div>
  );
}
