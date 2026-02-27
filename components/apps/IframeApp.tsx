"use client";

import { useState } from "react";
import { ExternalLink, Loader } from "lucide-react";

interface IframeAppProps {
  url: string;
}

export default function IframeApp({ url }: IframeAppProps) {
  const [loading, setLoading] = useState(true);

  const domain = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div className="relative w-full h-full bg-[#1d1b17]">

      {/* Loading indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
          <Loader size={16} className="text-white/25 animate-spin" />
          <span className="text-[10px] text-white/20 font-mono">{domain}</span>
        </div>
      )}

      {/* Always-visible "open in new tab" badge — useful if the site blocks embedding */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10
                   flex items-center gap-1 px-2 py-1 rounded-md
                   bg-black/50 backdrop-blur-sm
                   border border-white/10 hover:border-white/25
                   text-[10px] font-mono text-white/35 hover:text-white/70
                   transition-all"
        title={url}
      >
        <ExternalLink size={9} />
        {domain}
      </a>

      <iframe
        src={url}
        className="w-full h-full border-0"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.25s" }}
        onLoad={() => setLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        title={domain}
      />
    </div>
  );
}
