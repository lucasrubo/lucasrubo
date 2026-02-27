"use client";

import { useState } from "react";
import {
  Sparkles, PlayCircle, BarChart2, AlertTriangle,
  FlaskConical, Flag, ScrollText, Database, Workflow,
  Globe, ArrowRight, Send,
} from "lucide-react";
import { useWindows } from "@/contexts/WindowContext";

function PHLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="0"  y="18" width="5" height="10" rx="1.5" fill="#f54e00" />
      <rect x="8"  y="11" width="5" height="17" rx="1.5" fill="#ECB22E" />
      <rect x="16" y="5"  width="5" height="23" rx="1.5" fill="#2EB67D" />
      <rect x="24" y="0"  width="4" height="28" rx="1.5" fill="#36C5F0" />
    </svg>
  );
}

const TABS = ["Startup / Side project", "Growth", "Scale"] as const;
type Tab = (typeof TABS)[number];

const APPS = [
  { id: "ai",          label: "PostHog AI",        icon: Sparkles,      color: "#6e8cf9" },
  { id: "replay",      label: "Session Replay",    icon: PlayCircle,    color: "#2EB67D" },
  { id: "analytics",   label: "Web Analytics",     icon: Globe,         color: "#36C5F0" },
  { id: "product",     label: "Product Analytics", icon: BarChart2,     color: "#ECB22E" },
  { id: "errors",      label: "Error Tracking",    icon: AlertTriangle, color: "#E01E5A" },
  { id: "experiments", label: "Experiments",       icon: FlaskConical,  color: "#f54e00" },
  { id: "flags",       label: "Feature Flags",     icon: Flag,          color: "#E01E5A" },
  { id: "logs",        label: "Logs",              icon: ScrollText,    color: "#9ca3af" },
  { id: "cdp",         label: "CDP",               icon: Database,      color: "#987cb0" },
  { id: "workflows",   label: "Workflows",         icon: Workflow,      color: "#36C5F0" },
];

export default function HomeApp() {
  const [activeTab, setActiveTab] = useState<Tab>("Startup / Side project");
  const [selectedApp, setSelectedApp] = useState("ai");
  const { openWindow } = useWindows();

  return (
    <div className="min-h-full bg-white text-ph-dark">
      {/* Hero */}
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5 mb-3">
          <PHLogo />
          <span className="text-2xl font-bold tracking-tight">PostHog</span>
        </div>
        <p className="text-sm text-gray-500 mb-5 max-w-md">
          We make dev tools that help product engineers build successful products.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => openWindow("signup", { title: "Sign up – PostHog", size: { width: 480, height: 520 } })}
            className="bg-ph-orange text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#d94400] transition-colors"
          >
            Get started - free
          </button>
          <button className="border border-gray-200 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
            Install with AI
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-400">
          Questions?{" "}
          <span className="underline cursor-pointer hover:text-ph-orange">Watch a demo</span>{" "}
          or{" "}
          <span className="underline cursor-pointer hover:text-ph-orange">talk to a human</span>.
        </p>
      </div>

      {/* Explore apps */}
      <div className="px-8 py-5">
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-bold">Explore apps</h2>
            <span className="text-xs text-gray-400">by company stage</span>
          </div>
          <button className="text-xs text-ph-orange hover:underline flex items-center gap-1">
            Browse app library (34) <ArrowRight size={11} />
          </button>
        </div>

        {/* Stage tabs */}
        <div className="flex gap-0 mb-4 border border-gray-200 rounded-lg overflow-hidden w-fit">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-gray-100 text-ph-dark"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* App explorer */}
        <div className="flex border border-gray-200 rounded-xl overflow-hidden" style={{ height: 290 }}>
          {/* App list */}
          <div className="w-44 shrink-0 border-r border-gray-100 overflow-y-auto">
            {APPS.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors ${
                    selectedApp === app.id
                      ? "bg-gray-100 text-ph-dark"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  <Icon size={14} style={{ color: app.color }} className="shrink-0" />
                  <span className="text-xs font-medium truncate">{app.label}</span>
                </button>
              );
            })}
          </div>

          {/* Selected panel */}
          <div className="flex-1 overflow-hidden">
            {selectedApp === "ai" ? (
              <AIPanel />
            ) : (
              <GenericPanel
                app={APPS.find((a) => a.id === selectedApp)!}
                onOpen={() =>
                  openWindow(selectedApp, {
                    title: `${APPS.find((a) => a.id === selectedApp)?.label} – PostHog`,
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIPanel() {
  return (
    <div className="h-full flex flex-col">
      {/* Blue header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1d4ed8]">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-white" />
          <span className="text-sm font-semibold text-white">PostHog AI</span>
          <span className="text-xs text-blue-200 ml-1 hidden sm:inline">
            Ask questions about how people use your product
          </span>
        </div>
        <button className="text-xs font-semibold bg-white text-[#1d4ed8] px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
          Explore
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="w-9 h-9 mb-3">
          <svg viewBox="0 0 28 28" fill="none">
            <rect x="0"  y="18" width="5" height="10" rx="1.5" fill="#f54e00" />
            <rect x="8"  y="11" width="5" height="17" rx="1.5" fill="#ECB22E" />
            <rect x="16" y="5"  width="5" height="23" rx="1.5" fill="#2EB67D" />
            <rect x="24" y="0"  width="4" height="28" rx="1.5" fill="#36C5F0" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-ph-dark mb-1">
          How can I help you understand users?
        </h3>
        <p className="text-xs text-gray-400 mb-4 italic">Build something people want.</p>

        <div className="w-full max-w-xs relative">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 pr-8"
            placeholder="Ask a question / for commands"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#1d4ed8] transition-colors">
            <Send size={13} />
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500">Auto ▾</span>
          <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500">⊕ Add context ▾</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 border-t border-gray-100 flex flex-wrap gap-1.5">
        {["Product analytics", "SQL", "Session replay", "SDK setup", "Feature flags", "Experiments", "Surveys", "Docs"].map(
          (t) => (
            <button key={t} className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-0.5 rounded transition-colors">
              {t}
            </button>
          )
        )}
      </div>
    </div>
  );
}

function GenericPanel({
  app,
  onOpen,
}: {
  app: { label: string; icon: React.ElementType; color: string };
  onOpen: () => void;
}) {
  const Icon = app.icon;
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: `${app.color}18` }}
      >
        <Icon size={28} style={{ color: app.color }} />
      </div>
      <h3 className="font-bold text-ph-dark text-sm">{app.label}</h3>
      <button
        onClick={onOpen}
        className="text-xs font-semibold bg-ph-orange text-white px-4 py-1.5 rounded-md hover:bg-[#d94400] transition-colors"
      >
        Open {app.label}
      </button>
    </div>
  );
}
