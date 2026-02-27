"use client";

import { ExternalLink, Github, Star } from "lucide-react";

const PROJECTS = [
  {
    id: "roteirum",
    name: "Roteirum",
    tagline: "Social network for cinematic creation with AI",
    description:
      "Innovative platform where creators build synopses, generate posters and AI-powered images for film and TV projects. Think Instagram meets screenplay writing.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "React Query", "Radix UI"],
    demo: "https://lucasrubo.github.io/Roteirum/",
    github: "https://github.com/lucasrubo/Roteirum",
    color: "#987cb0",
    emoji: "🎬",
    featured: true,
  },
  {
    id: "erp",
    name: "ERP Multi-Empresa",
    tagline: "Modern multi-company ERP system",
    description:
      "Responsive administrative dashboard with order creation, sales management, and multi-company support. Full CRUD with role-based access control.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "React Hook Form"],
    demo: "https://lucasrubo.github.io/ERP/dashboard",
    github: "https://github.com/lucasrubo/ERP",
    color: "#36C5F0",
    emoji: "🏢",
    featured: true,
  },
  {
    id: "larissa",
    name: "Larissa Arendt Portfolio",
    tagline: "Modern and elegant personal portfolio",
    description:
      "Clean, professional portfolio site built for a client. Focuses on elegant typography, smooth animations and accessibility.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Radix UI"],
    demo: "#",
    github: "#",
    color: "#E01E5A",
    emoji: "🎨",
    featured: false,
  },
];

export default function ProjectsApp() {
  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 bg-gradient-to-b from-ph-cream/40 to-white">
        <h1 className="text-2xl font-bold text-ph-dark tracking-tight mb-1">
          Projects
        </h1>
        <p className="text-sm text-gray-500">
          Featured work — {PROJECTS.length} projects
        </p>
      </div>

      {/* Projects */}
      <div className="px-8 py-6 space-y-5">
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            className="group relative border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-md transition-all bg-white overflow-hidden"
          >
            {/* Color accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
              style={{ backgroundColor: p.color }}
            />

            <div className="pl-6 pr-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{p.emoji}</span>
                    <h2 className="text-base font-bold text-ph-dark">{p.name}</h2>
                    {p.featured && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                        <Star size={9} className="fill-yellow-500 text-yellow-500" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-400 mb-2">
                    {p.tagline}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  {p.demo !== "#" && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-semibold text-white px-3 py-1.5 rounded-md transition-colors"
                      style={{ backgroundColor: p.color }}
                    >
                      Live demo <ExternalLink size={10} />
                    </a>
                  )}
                  {p.github !== "#" && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-semibold border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <Github size={11} /> Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More on GitHub */}
      <div className="px-8 pb-8">
        <a
          href="https://github.com/lucasrubo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-ph-orange/40 hover:text-ph-orange transition-colors"
        >
          <Github size={15} /> More projects on GitHub
        </a>
      </div>
    </div>
  );
}
