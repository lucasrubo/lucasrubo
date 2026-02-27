"use client";

import {
  BarChart3,
  PlayCircle,
  Flag,
  FlaskConical,
  MessageSquare,
  Database,
  TrendingUp,
  Users,
  Shield,
  Zap,
} from "lucide-react";

interface ProductAppProps {
  appId: string;
}

const PRODUCT_DATA: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    color: string;
    icon: React.ElementType;
    features: { icon: React.ElementType; title: string; desc: string }[];
    screenshot?: string;
  }
> = {
  analytics: {
    name: "Product Analytics",
    tagline: "Understand how users experience your product",
    description:
      "Powerful analytics built for product teams. Funnels, trends, paths, retention, user journeys — all in one tool.",
    color: "#36C5F0",
    icon: BarChart3,
    features: [
      { icon: TrendingUp, title: "Funnels & Trends", desc: "See where users drop off and what drives conversion." },
      { icon: Users, title: "Cohort Analysis", desc: "Group users by behavior and track them over time." },
      { icon: BarChart3, title: "Retention Charts", desc: "Understand which features keep users coming back." },
      { icon: Zap, title: "Real-time Events", desc: "See events as they happen, no sampling." },
    ],
  },
  replay: {
    name: "Session Replay",
    tagline: "Watch how users actually use your product",
    description:
      "Record and replay user sessions to see exactly what happens in your app — including console logs and network requests.",
    color: "#2EB67D",
    icon: PlayCircle,
    features: [
      { icon: PlayCircle, title: "Full Session Recording", desc: "Capture every click, scroll, and interaction." },
      { icon: Shield, title: "Privacy Controls", desc: "Mask sensitive data automatically." },
      { icon: BarChart3, title: "Linked to Analytics", desc: "Jump from a funnel drop-off directly to a replay." },
      { icon: Zap, title: "Instant Playback", desc: "No waiting — replay starts immediately." },
    ],
  },
  flags: {
    name: "Feature Flags",
    tagline: "Ship features safely with instant rollbacks",
    description:
      "Roll out features to specific users, groups, or percentages. Toggle off instantly if something goes wrong.",
    color: "#E01E5A",
    icon: Flag,
    features: [
      { icon: Flag, title: "Instant Rollbacks", desc: "Turn off a feature for all users in seconds." },
      { icon: Users, title: "User Targeting", desc: "Roll out to specific users, groups, or percentages." },
      { icon: Shield, title: "Multi-environment", desc: "Separate flags for dev, staging, and production." },
      { icon: Zap, title: "Local Evaluation", desc: "Evaluate flags locally — ultra-low latency." },
    ],
  },
  experiments: {
    name: "A/B Testing",
    tagline: "Run experiments with statistical rigor",
    description:
      "Test your hypotheses with proper A/B and multivariate experiments. Get statistically significant results you can act on.",
    color: "#ECB22E",
    icon: FlaskConical,
    features: [
      { icon: FlaskConical, title: "Multivariate Tests", desc: "Test multiple variants at once." },
      { icon: TrendingUp, title: "Bayesian Statistics", desc: "Know when you have enough data to decide." },
      { icon: Users, title: "Holdout Groups", desc: "Measure long-term impact of features." },
      { icon: Zap, title: "Linked to Feature Flags", desc: "Use existing flags as experiment variants." },
    ],
  },
  surveys: {
    name: "Surveys",
    tagline: "Capture qualitative insights from real users",
    description:
      "Ask your users the right questions at the right moment. NPS, CSAT, open-ended — all types supported.",
    color: "#6e8cf9",
    icon: MessageSquare,
    features: [
      { icon: MessageSquare, title: "In-app Surveys", desc: "Show surveys in your product at the right moment." },
      { icon: Users, title: "Targeted Audiences", desc: "Ask specific user segments based on behavior." },
      { icon: BarChart3, title: "Linked to Analytics", desc: "Correlate survey responses with product data." },
      { icon: Shield, title: "NPS & CSAT", desc: "Industry-standard survey types built in." },
    ],
  },
  warehouse: {
    name: "Data Warehouse",
    tagline: "One source of truth for all your data",
    description:
      "Sync AprixOS with your data warehouse. Combine product data with CRM, billing, and other sources.",
    color: "#f54e00",
    icon: Database,
    features: [
      { icon: Database, title: "Sync to any warehouse", desc: "BigQuery, Snowflake, Redshift, S3 and more." },
      { icon: Zap, title: "Real-time Pipelines", desc: "Data flows in minutes, not hours." },
      { icon: Users, title: "External Data Sources", desc: "Import from Stripe, Hubspot, Salesforce." },
      { icon: BarChart3, title: "SQL Access", desc: "Query your AprixOS data with SQL directly." },
    ],
  },
};

export default function ProductApp({ appId }: ProductAppProps) {
  const data = PRODUCT_DATA[appId];

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        App not found
      </div>
    );
  }

  const { name, tagline, description, color, icon: Icon, features } = data;

  return (
    <div className="min-h-full bg-white">
      {/* Hero */}
      <div
        className="px-10 pt-10 pb-8 border-b border-gray-100"
        style={{ background: `linear-gradient(135deg, ${color}10 0%, white 60%)` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <h1 className="text-3xl font-bold text-ph-dark tracking-tight mb-2">
          {name}
        </h1>
        <p className="text-ph-orange font-semibold text-sm mb-3">{tagline}</p>
        <p className="text-gray-500 text-sm max-w-lg leading-relaxed">
          {description}
        </p>
        <button
          className="mt-5 text-sm font-semibold px-5 py-2 rounded-md text-white transition-colors"
          style={{ backgroundColor: color }}
        >
          Get started free
        </button>
      </div>

      {/* Features */}
      <div className="px-10 py-8">
        <h2 className="text-base font-bold text-ph-dark mb-5">
          What&apos;s included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ icon: FIcon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: `${color}15` }}
              >
                <FIcon size={15} style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ph-dark">{title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
