export const NAV_ITEMS = [
  { label: "Products", href: "/#products", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Customers", href: "/customers" },
  { label: "Company", href: "/company", hasDropdown: true },
];

export const PRODUCTS = [
  {
    name: "Product Analytics",
    description:
      "Funnels, trends, paths, retention and much more to understand how users experience your product.",
    icon: "BarChart3",
    color: "#36C5F0",
    href: "/product-analytics",
  },
  {
    name: "Session Replay",
    description:
      "Watch recordings of actual user sessions, complete with console logs and network activity.",
    icon: "PlayCircle",
    color: "#2EB67D",
    href: "/session-replay",
  },
  {
    name: "Feature Flags",
    description:
      "Safely roll out features to specific users or groups. Roll back instantly if something goes wrong.",
    icon: "Flag",
    color: "#E01E5A",
    href: "/feature-flags",
  },
  {
    name: "A/B Testing",
    description:
      "Run multivariate tests and experiments. Analyze the impact on your key metrics with statistical significance.",
    icon: "FlaskConical",
    color: "#ECB22E",
    href: "/ab-testing",
  },
  {
    name: "Surveys",
    description:
      "Collect qualitative data from your users with targeted surveys and in-app messages.",
    icon: "MessageSquare",
    color: "#6e8cf9",
    href: "/surveys",
  },
  {
    name: "Data Warehouse",
    description:
      "Sync PostHog data with external sources. Build a complete picture of your customers.",
    icon: "Database",
    color: "#f54e00",
    href: "/data-warehouse",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started.",
    highlight: false,
    features: [
      "1 million analytics events/month",
      "5,000 session recordings/month",
      "1 million feature flag requests/month",
      "100,000 logged errors/month",
      "Unlimited team members",
      "No credit card required",
    ],
    cta: "Get started - free",
    ctaHref: "/signup",
  },
  {
    name: "Boost",
    price: "$250",
    period: "/month",
    description: "For growing teams that need more.",
    highlight: false,
    features: [
      "Everything in Free",
      "Unlimited projects",
      "White labeling",
      "HIPAA BAA compliance",
      "Priority support",
      "Custom domains",
    ],
    cta: "Start with Boost",
    ctaHref: "/signup?plan=boost",
  },
  {
    name: "Scale",
    price: "$750",
    period: "/month",
    description: "For scaling companies with compliance needs.",
    highlight: true,
    features: [
      "Everything in Boost",
      "SAML-based SSO",
      "Advanced access controls",
      "Provisioning (SCIM)",
      "Dedicated Slack support",
      "SLA guarantees",
    ],
    cta: "Start with Scale",
    ctaHref: "/signup?plan=scale",
  },
  {
    name: "Enterprise",
    price: "$2,000",
    period: "/month",
    description: "For large organizations with advanced security.",
    highlight: false,
    features: [
      "Everything in Scale",
      "RBAC (Role-Based Access Control)",
      "Dedicated customer success",
      "Training & onboarding",
      "Advanced security review",
      "60-month data retention",
    ],
    cta: "Contact sales",
    ctaHref: "/contact-sales",
  },
];

export const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Products: [
    { label: "Product Analytics", href: "/product-analytics" },
    { label: "Session Replay", href: "/session-replay" },
    { label: "Feature Flags", href: "/feature-flags" },
    { label: "A/B Testing", href: "/ab-testing" },
    { label: "Surveys", href: "/surveys" },
    { label: "Data Warehouse", href: "/data-warehouse" },
  ],
  Platform: [
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
    { label: "API", href: "/docs/api" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "https://status.posthog.com" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Media", href: "/media" },
    { label: "Handbook", href: "/handbook" },
  ],
  Community: [
    { label: "Questions", href: "/questions" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Merch", href: "/merch" },
    { label: "GitHub", href: "https://github.com/PostHog/posthog" },
    { label: "Discord", href: "https://posthog.com/slack" },
  ],
};
