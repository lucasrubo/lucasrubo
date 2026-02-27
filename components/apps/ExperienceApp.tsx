"use client";

import { useLanguage } from "@/contexts/LanguageContext";

// Static data — proper nouns don't need translation.
// Only `description` is pulled from translations by index.
const EXPERIENCE = [
  { role: "Mid-level Development Analyst", company: "Areco",  period: "2024 – Present", tech: ["C#", "Blazor", "Next.js", "SQL", "Delphi", "PHP"], current: true  },
  { role: "Junior Developer",             company: "Areco",  period: "2023 – 2024",    tech: ["PHP", "SQL", "JavaScript", "HTML/CSS"],              current: false },
  { role: "Systems Developer Intern",     company: "IBM",    period: "2021 – 2022",    tech: ["Jenkins", "CI/CD", "Python", "Git"],                 current: false },
  { role: "Programming Assistant",        company: "NB41",   period: "2019 – 2021",    tech: ["PHP", "JavaScript", "HTML/CSS", "MySQL"],            current: false },
];

const EDUCATION = [
  { degree: "Bachelor's in Computer Science", institution: "Universidade Paulista (UNIP)", period: "2019 – 2023" },
  { degree: "Technical Course in IT",         institution: "SENAI São Paulo",              period: "2017 – 2019" },
];

export default function ExperienceApp() {
  const { t } = useLanguage();
  const e = t.experience;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8 bg-linear-to-b from-ph-cream/40 to-white dark:from-transparent dark:to-ph-dark">
        <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90 tracking-tight mb-1">{e.title}</h1>
        <p className="text-sm text-gray-500 dark:text-white/45">{e.subtitle}</p>
      </div>

      {/* Work */}
      <div className="px-8 pt-6 pb-4">
        <h2 className="text-xs font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-5">
          {e.sectionWork}
        </h2>
        <div className="relative">
          <div className="absolute left-1.75 top-2 bottom-0 w-px bg-gray-200 dark:bg-white/10" />
          <div className="space-y-6">
            {EXPERIENCE.map((job, i) => (
              <div key={i} className="relative pl-7">
                <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                  job.current
                    ? "bg-ph-orange border-white dark:border-ph-dark"
                    : "bg-gray-300 dark:bg-white/20 border-white dark:border-ph-dark"
                }`} />
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1.5">
                  <div>
                    <h3 className="text-sm font-bold text-ph-dark dark:text-white/85">{job.role}</h3>
                    <p className="text-xs font-semibold text-ph-orange">{job.company}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    job.current
                      ? "bg-ph-orange/10 text-ph-orange"
                      : "text-gray-400 dark:text-white/35 bg-gray-100 dark:bg-white/8"
                  }`}>
                    {job.period}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-white/45 leading-relaxed mb-2">
                  {e.jobs[i].description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {job.tech.map((tech) => (
                    <span key={tech} className="text-[10px] bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-white/45 px-2 py-0.5 rounded font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="px-8 py-6 border-t border-gray-100 dark:border-white/8">
        <h2 className="text-xs font-bold text-gray-400 dark:text-white/35 uppercase tracking-widest mb-5">
          {e.sectionEducation}
        </h2>
        <div className="space-y-4">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/8">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-ph-dark dark:text-white/85">{edu.degree}</h3>
                <p className="text-xs font-semibold text-ph-orange mb-1">{edu.institution}</p>
                <p className="text-xs text-gray-500 dark:text-white/45 leading-relaxed">
                  {e.education[i].description}
                </p>
              </div>
              <span className="text-[11px] text-gray-400 dark:text-white/35 shrink-0">{edu.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
