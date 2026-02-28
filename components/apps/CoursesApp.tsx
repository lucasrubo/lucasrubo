"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

type CourseType = "Web Development" | "Database" | "Architecture" | "Best Practices" | "Programming" | "DevOps";

interface Certificate {
  name: string;
  issuer: "desenvolvedor.io" | "Udemy";
  type: CourseType;
  issueDate: string;
  url: string;
}

const CERTIFICATES: Certificate[] = [
  { name: "ASP.NET Core Enterprise Applications",          issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/ab2e42c7-09a6-48dc-ae2d-72557295ea59" },
  { name: "Mastering ASP.NET Core MVC",                    issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/9a2fbf67-cd5e-456c-bf5a-7fffad43d18f" },
  { name: "Data Access Expert Training",                   issuer: "desenvolvedor.io", type: "Database",        issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/77852047-d43e-453e-b520-b95a491a1d3f" },
  { name: ".NET Full Stack Developer Training",            issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/1fc502b9-f3b8-46fb-b0a5-4264daa15bcb" },
  { name: "Software Architecture Fundamentals",            issuer: "desenvolvedor.io", type: "Architecture",    issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/c92ede62-4a94-41a9-b953-587861373598" },
  { name: "Professional Programming with Clean Code",      issuer: "desenvolvedor.io", type: "Best Practices",  issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/55f6e819-97f2-4382-a803-f96b1ee477dd" },
  { name: "Designing Three-Layer Architectures",           issuer: "desenvolvedor.io", type: "Architecture",    issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/4fd18ea1-b1a2-4b50-9d88-e18f3678ed96" },
  { name: "SQL for Developers",                            issuer: "desenvolvedor.io", type: "Database",        issueDate: "Feb 2025", url: "https://desenvolvedor.io/certificado/fbf539be-d93f-459c-aff3-d90b02daf2d2" },
  { name: "Mastering Entity Framework Core",               issuer: "desenvolvedor.io", type: "Database",        issueDate: "Jan 2025", url: "https://desenvolvedor.io/certificado/e0e9520b-24f6-4e8e-baf0-5f32c54c96fe" },
  { name: "REST with ASP.NET Core WebAPI",                 issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Jan 2025", url: "https://desenvolvedor.io/certificado/cf2e347e-d25a-4fe4-9811-6e71fbf40f46" },
  { name: ".NET Developer Training",                       issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Dec 2024", url: "https://desenvolvedor.io/certificado/9adf6fb3-23a0-4aa1-a497-4676c0b7437a" },
  { name: "APIs Fundamentals in ASP.NET Core",             issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Dec 2024", url: "https://desenvolvedor.io/certificado/98470ba0-3f05-433a-bb3d-faad6203e1bb" },
  { name: "Blazor Fundamentals",                           issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Dec 2024", url: "https://desenvolvedor.io/certificado/e9cbb0e3-bf29-41e2-9c9f-843e1f1e0a97" },
  { name: "Introduction to Entity Framework Core",         issuer: "desenvolvedor.io", type: "Database",        issueDate: "Dec 2024", url: "https://desenvolvedor.io/certificado/3c16a65f-d8fc-4b79-b900-47987a705174" },
  { name: "ASP.NET MVC Fundamentals",                      issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Sep 2024", url: "https://desenvolvedor.io/certificado/2848bef3-957b-4575-b52b-afcdb40e6cb6" },
  { name: "C# Fundamentals",                               issuer: "desenvolvedor.io", type: "Programming",     issueDate: "Sep 2024", url: "https://desenvolvedor.io/certificado/825cd238-dbe9-40d3-b344-4bc6074d5f80" },
  { name: "Getting Started with ASP.NET Core",             issuer: "desenvolvedor.io", type: "Web Development", issueDate: "Sep 2024", url: "https://desenvolvedor.io/certificado/11351ec3-bf2a-417b-a81c-4319a6be4c60" },
  { name: "DevOps: CI/CD with Jenkins Ansible Kubernetes", issuer: "Udemy",            type: "DevOps",          issueDate: "Oct 2022", url: "https://www.udemy.com/certificate/UC-065c45ab-bb1b-4904-8737-fb510cbb5630/" },
  { name: "JavaScript from Basic to Advanced",             issuer: "Udemy",            type: "Programming",     issueDate: "Oct 2022", url: "https://www.udemy.com/certificate/UC-38fd00fe-0b73-4564-8322-219371e04804/" },
  { name: "Python 3 from Basic to Advanced",               issuer: "Udemy",            type: "Programming",     issueDate: "Sep 2022", url: "https://www.udemy.com/certificate/UC-af83d567-aa2b-4796-8bc3-2c58a4f07bba/" },
  { name: "Clean Code",                                    issuer: "Udemy",            type: "Best Practices",  issueDate: "Jul 2022", url: "https://www.udemy.com/certificate/UC-0d026173-2ed7-468f-93cf-9fa08606ffac/" },
];

const TYPE_COLORS: Record<CourseType, string> = {
  "Web Development": "#6e8cf9",
  "Database":        "#2EB67D",
  "Architecture":    "#987cb0",
  "Best Practices":  "#ECB22E",
  "Programming":     "#36C5F0",
  "DevOps":          "#E01E5A",
};

const ISSUER_STYLE: Record<string, { bg: string; label: string }> = {
  "desenvolvedor.io": { bg: "#4f46e5", label: "dev.io" },
  "Udemy":            { bg: "#a435f0", label: "Udemy"  },
};

// Ordered types for the filter bar
const ALL_TYPES = Array.from(new Set(CERTIFICATES.map((c) => c.type))) as CourseType[];

export default function CoursesApp() {
  const [activeFilter, setActiveFilter] = useState<CourseType | null>(null);

  const filtered = activeFilter
    ? CERTIFICATES.filter((c) => c.type === activeFilter)
    : CERTIFICATES;

  return (
    <div className="min-h-full bg-white dark:bg-ph-dark overflow-auto">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-gray-100 dark:border-white/8 bg-linear-to-b from-ph-cream/40 to-white dark:from-transparent dark:to-ph-dark">
        <h1 className="text-2xl font-bold text-ph-dark dark:text-white/90 tracking-tight mb-1">
          Courses &amp; Certificates
        </h1>
        <p className="text-sm text-gray-500 dark:text-white/45">
          {filtered.length} of {CERTIFICATES.length} certificates
          {activeFilter && <> · <span style={{ color: TYPE_COLORS[activeFilter] }}>{activeFilter}</span></>}
        </p>
      </div>

      {/* Filter bar */}
      <div className="px-6 pt-4 pb-2 flex flex-wrap gap-2">
        {/* All button */}
        <button
          onClick={() => setActiveFilter(null)}
          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all ${
            activeFilter === null
              ? "bg-ph-dark dark:bg-white text-white dark:text-ph-dark border-transparent"
              : "text-gray-500 dark:text-white/50 border-gray-200 dark:border-white/12 hover:border-gray-300 dark:hover:border-white/25 hover:text-gray-700 dark:hover:text-white/75"
          }`}
        >
          All
        </button>

        {ALL_TYPES.map((type) => {
          const color = TYPE_COLORS[type];
          const isActive = activeFilter === type;
          return (
            <button
              key={type}
              onClick={() => setActiveFilter(isActive ? null : type)}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all"
              style={
                isActive
                  ? { backgroundColor: color, color: "white", borderColor: "transparent" }
                  : {
                      color: "var(--filter-text)",
                      borderColor: `${color}44`,
                      backgroundColor: `${color}0f`,
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${color}22`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}88`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${color}0f`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}44`;
                }
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: isActive ? "white" : color }}
              />
              <span style={{ color: isActive ? "white" : color }}>{type}</span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      <div className="px-6 py-3 grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((cert, i) => {
          const typeColor = TYPE_COLORS[cert.type];
          const issuerStyle = ISSUER_STYLE[cert.issuer];
          return (
            <a
              key={i}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 border border-gray-100 dark:border-white/8 rounded-xl p-4 hover:border-gray-200 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-black/30 transition-all bg-white dark:bg-white/4"
            >
              {/* Color dot */}
              <div
                className="mt-0.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: typeColor }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ph-dark dark:text-white/85 leading-snug mb-1.5 group-hover:text-ph-orange transition-colors">
                  {cert.name}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Issuer badge */}
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: issuerStyle.bg }}
                  >
                    {issuerStyle.label}
                  </span>
                  {/* Type badge */}
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${typeColor}22`, color: typeColor }}
                  >
                    {cert.type}
                  </span>
                  {/* Date */}
                  <span className="text-[10px] text-gray-400 dark:text-white/30 ml-auto shrink-0">
                    {cert.issueDate}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ExternalLink
                size={13}
                className="shrink-0 mt-0.5 text-gray-300 dark:text-white/20 group-hover:text-ph-orange transition-colors"
              />
            </a>
          );
        })}
      </div>

      <div className="pb-8" />
    </div>
  );
}
