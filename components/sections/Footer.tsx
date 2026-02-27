import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-ph-dark text-white px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Logo light className="mb-4" />
            <p className="text-white/50 text-sm leading-relaxed">
              The only all-in-one platform built for developers.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com/PostHog/posthog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a
                href="https://twitter.com/PostHog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={17} />
              </a>
              <a
                href="https://linkedin.com/company/posthog"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-xs text-white/50 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-sm">
            © {new Date().getFullYear()} PostHog, Inc.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security", "Cookie Policy"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase().replace(" ", "-")}`}
                className="text-white/35 hover:text-white text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
