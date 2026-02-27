"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const SKILL_GROUPS = [
  {
    categoryKey: "frontend" as const,
    color: "#6e8cf9",
    skills: [
      { name: "React",        level: 80 },
      { name: "Next.js",      level: 85 },
      { name: "TypeScript",   level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Blazor",       level: 85 },
      { name: "HTML / CSS",   level: 95 },
    ],
  },
  {
    categoryKey: "backendDb" as const,
    color: "#2EB67D",
    skills: [
      { name: "C#",         level: 90 },
      { name: "PHP",        level: 80 },
      { name: "Node.js",    level: 70 },
      { name: "SQL",        level: 80 },
      { name: "Python",     level: 60 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    categoryKey: "tools" as const,
    color: "#ECB22E",
    skills: [
      { name: "Git",     level: 90 },
      { name: "Docker",  level: 65 },
      { name: "Figma",   level: 70 },
      { name: "CI/CD",   level: 70 },
      { name: "Scrum",   level: 85 },
      { name: "Jenkins", level: 60 },
    ],
  },
];

export default function SkillsApp() {
  const { t } = useLanguage();
  const s = t.skills;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8 bg-linear-to-b from-ph-cream/40 to-white dark:from-transparent dark:to-ph-dark">
        <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90 tracking-tight mb-1">{s.title}</h1>
        <p className="text-sm text-gray-500 dark:text-white/45">{s.subtitle}</p>
      </div>

      {/* Skill groups */}
      <div className="px-8 py-6 space-y-8">
        {SKILL_GROUPS.map((group) => (
          <div key={group.categoryKey}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: group.color }} />
              <h2 className="text-sm font-bold text-ph-dark dark:text-white/85">
                {s.categories[group.categoryKey]}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-gray-700 dark:text-white/65">{skill.name}</span>
                    <span className="text-[11px] text-gray-400 dark:text-white/35">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${skill.level}%`, backgroundColor: group.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications banner */}
      <div className="mx-8 mb-8 p-4 bg-ph-orange/5 dark:bg-ph-orange/8 border border-ph-orange/20 rounded-xl">
        <p className="text-sm font-semibold text-ph-dark dark:text-white/85 mb-1">{s.certTitle}</p>
        <p className="text-xs text-gray-500 dark:text-white/45 leading-relaxed">
          {s.certBody}{" "}
          <span className="font-semibold text-ph-dark dark:text-white/75">{s.certPlatform1}</span>{" "}
          {s.certAnd}{" "}
          <span className="font-semibold text-ph-dark dark:text-white/75">{s.certPlatform2}</span>.
        </p>
      </div>
    </div>
  );
}
